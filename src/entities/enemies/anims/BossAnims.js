export default (anims) => {
    anims.create({
        key: 'boss2_idle',
        frames: anims.generateFrameNumbers('boss_level2', { start: 0, end: 3 }),
        frameRate: 3,
        repeat: -1,
    });

    anims.create({
        key: 'boss2_attack',
        frames: anims.generateFrameNumbers('boss_level2', { start: 18, end: 22 }),
        frameRate: 3,
        repeat: 1
    });
  };