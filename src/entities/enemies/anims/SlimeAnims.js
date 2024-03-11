export default anims => {
    anims.create({
        key: 'greenSlime_jump',
        frames: anims.generateFrameNumbers(`green_slime`, { start: 0, end: 2 }),
        frameRate: 2,
        repeat: -1
    });
    anims.create({
        key: 'purpleSlime_jump',
        frames: anims.generateFrameNumbers(`purple_slime`, { start: 0, end: 2 }),
        frameRate: 2,
        repeat: -1
    });
}