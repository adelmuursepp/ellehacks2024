import 'aframe';
import 'aframe-ar';
import { Entity, Scene } from 'aframe-react';

export const SimpleARScene = () => {
  return (
    <Scene embedded arjs='sourceType: webcam; debugUIEnabled: false;'>
      <Entity marker={{ preset: 'hiro' }}>
        <Entity geometry={{ primitive: 'box' }} material={{ color: 'yellow' }} position='0 0.5 0' />
      </Entity>
    </Scene>
  );
};
