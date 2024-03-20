export default (anims) => {
    anims.create({
        key: 'boss2_idle',
        frames: anims.generateFrameNumbers('boss_level2', { start: 0, end: 3 }),
        frameRate: 2,
        repeat: -1,
    });
  };