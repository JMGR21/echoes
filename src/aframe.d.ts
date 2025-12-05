import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-entity": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-box": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-sphere": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-cylinder": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-plane": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-ring": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-torus": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-text": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-sky": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-camera": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
      "a-cursor": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
    }
  }
}