export default anims =>{
  // Animate the sprites
  anims.create({
    key: 'player_run',
    frames: anims.generateFrameNumbers('player_run', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'player_idle',
    frames: anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
    frameRate: 6,
    repeat: -1
  });

  anims.create({
    key: 'player_jump',
    frames: anims.generateFrameNumbers('player_jump', { start: 0, end: 1 }),
    frameRate: 2,
    repeat: -1
  });

  anims.create({
    key: 'player_fall',
    frames: anims.generateFrameNumbers('player_fall', { start: 0, end: 1 }),
    frameRate: 2,
    repeat: -1
  });

  anims.create({
    key: 'npc1_talk',
    frames: anims.generateFrameNumbers('npc1_talk', { start: 0, end: 6 }),
    frameRate: 4,
    repeat: -1
  });
}
