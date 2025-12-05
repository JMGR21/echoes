import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-entity': any;
      'a-box': any;
      'a-sphere': any;
      'a-cylinder': any;
      'a-plane': any;
      'a-ring': any;
      'a-torus': any;
      'a-text': any;
      'a-sky': any;
      'a-camera': any;
      'a-cursor': any;
    }
  }
}

export {};
