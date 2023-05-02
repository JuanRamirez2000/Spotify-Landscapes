import dynamic from "next/dynamic";
import React from "react";
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});
import type p5Types from "p5";
import type { AverageAudioFeatures } from "~/types/CustomTypes";

//! Mode - Night / Day
//! Energy - Used for adjusting amount of noise falloff
//! Valence - color
//! Danceability - Amount of stuff in the sky

const nMountains = 4;
const nPoints = 150; // Total Number of peaks for the height of the mountains
const mountainStart = 0.6; // Height of the tallest mountain
const mountainEnd = 0.15; // Height of the shortest mountain
const amplitudeStart = 0.4; // How height of peaks
const amplitudeEnd = 0.3; // Depth of valleys
const stepStart = 0.04; // How quickly the function calculates
const stepEnd = 0.01; // Low values to allow for small jumps
const stars: Star[] = [];
const clouds: Cloud[] = [];
let moon: Moon;
let sun: Sun;

export default function Landscape({
  audioFeatures,
}: {
  audioFeatures: AverageAudioFeatures;
}) {
  //! Setup for the canvas
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.noStroke();
    p5.createCanvas(p5.windowWidth, (p5.windowHeight * 4) / 5).parent(
      canvasParentRef
    );

    //*If mode is minor represent a night sky, if mode is major represent a day sky
    //? Average mode used here
    p5.background(
      audioFeatures.averageMode == 0 ? p5.color("#1e293b") : p5.color("#fdf4ff")
    );
    if (audioFeatures.averageMode === 0) {
      moon = new Moon(p5);
      for (let i = 0; i < audioFeatures.averageDanceability * 100; i++) {
        stars.push(new Star(p5));
      }
    } else {
      sun = new Sun(p5);
      for (let i = 0; i < (audioFeatures.averageDanceability * 100) / 4; i++) {
        clouds.push(new Cloud(p5));
      }
    }
  };

  //! Used to draw the canvas
  const draw = (p5: p5Types) => {
    //* Loop over mountains, remap the ratio to pos, amp, and step

    //* Average energy used to create the jaggedness of mountains
    //! Draw Mountain
    for (let i = nMountains; i >= 0; i--) {
      const ratio = i / nMountains;
      p5.fill(p5.lerpColor(p5.color("#1f3c4a"), p5.color("#f1d7b9"), ratio));
      const pos = p5.map(ratio, 1, 0, mountainStart, mountainEnd);
      const amp = p5.map(ratio, 1, 0, amplitudeStart, amplitudeEnd);
      const step = p5.map(ratio, 1, 0, stepStart, stepEnd);
      //? Average Energy used here
      p5.noiseDetail(p5.map(ratio, 1, 0, 70, 10), audioFeatures.averageEnergy);
      drawMountain(p5, pos, amp, step, i);
    }
    //? Average Danceability Used Here

    //! Draw Stars
    if (audioFeatures.averageMode === 0) {
      for (let i = 0; i < audioFeatures.averageDanceability * 100; i++) {
        stars[i]?.display(p5);
      }
    } else {
      for (let i = 0; i < (audioFeatures.averageDanceability * 100) / 4; i++) {
        clouds[i]?.draw(p5);
      }
    }

    //! Draw Sun/Moon
    //? If average danceability > 0.5
    if (audioFeatures.averageDanceability > 0.5) {
      if (audioFeatures.averageMode) {
        sun.draw(p5);
      } else {
        moon.draw(p5);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
}

//! Function to draw the mountains
const drawMountain = (
  p5: p5Types,
  position: number,
  amplitude: number,
  step: number,
  z: number
) => {
  const mountain = Array<number>(nPoints).fill(0); //Mountaintop heights
  // Mean used to make sure mountain tops are
  // within the same range between layers
  let mean = 0;
  //* Decide heights of mountain based on amplitude and noise
  for (let i = 0; i <= nPoints; i++) {
    const v = p5.height * amplitude * p5.noise(i * step, 100 * z);
    mean += v;
    mountain[i] = v;
  }
  mean /= nPoints;
  //* Height offset of an individual mountain
  for (let i = 0; i <= nPoints; i++) {
    mountain[i] = p5.height * (1 - position) + mountain[i]! - mean;
  }

  //* Draw the mountain
  p5.beginShape();
  p5.vertex(0, p5.height);
  for (let i = 0; i <= nPoints; i++) {
    p5.vertex((i / nPoints) * p5.width, mountain[i]!);
  }
  p5.vertex(p5.width, p5.height);
  p5.endShape(p5.CLOSE);
};

//!Function to draw moon/sun
class Moon {
  x = 0;
  y = 0;
  constructor(p5: p5Types) {
    this.x = p5.random(125, p5.width - 125);
    this.y = p5.height / 6;
  }

  draw(p5: p5Types) {
    p5.fill(p5.color("white"));
    p5.ellipse(this.x, this.y, 125, 125);

    p5.fill(p5.color("#1e293b"));
    p5.ellipse(this.x - 25, this.y, 125, 125);
  }
}

class Sun {
  x = 0;
  y = 0;

  constructor(p5: p5Types) {
    this.x = p5.random(125, p5.width - 125);
    this.y = p5.height / 6;
  }
  draw(p5: p5Types) {
    p5.fill(p5.color("yellow"));
    p5.circle(this.x, this.y, 150);

    p5.fill(p5.color("orange"));
    p5.circle(this.x, this.y, 125);
  }
}

//! Star class
class Star {
  x = 0;
  y = 0;
  w = 4;
  h = 4;
  constructor(p5: p5Types) {
    this.x = p5.random(p5.windowWidth);
    this.y = p5.random(p5.height * mountainEnd * 2);
  }

  display(p5: p5Types) {
    p5.fill(255, 255, 0);
    p5.ellipse(this.x, this.y, this.w, this.h);
  }
}

class Cloud {
  x = 0;
  y = 0;

  constructor(p5: p5Types) {
    this.x = p5.random(p5.windowWidth);
    this.y = p5.random(p5.height * mountainEnd * 2);
  }

  draw(p5: p5Types) {
    p5.fill(p5.color("#a1a1aa"));
    p5.ellipse(this.x, this.y, 50, 20);
    p5.ellipse(this.x - 25, this.y + 10, 50, 20);
    p5.ellipse(this.x + 25, this.y + 10, 50, 20);
    p5.ellipse(this.x + 10, this.y + 20, 50, 20);
  }
}
