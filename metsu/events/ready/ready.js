module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Name :${client.user.tag} \nStatus: online`);
        console.log('Wating for Event ...(/)')
    },
};