'use strict';

const spawn = require('child_process').spawn;

class Clone {
  constructor(links) {
    this.gitProcess = null;
    this.links = links;
  }

  clone(i = 0) {
    const link = this.links[i];
    const twirl = this.twirlTimer(100);

    this.gitProcess = spawn('git', ['clone', link]);
    this.gitProcess.name = link.split('/')[4];

    this.gitProcess.on('exit', () => {
      clearInterval(twirl);
      process.stdout.write('');
      console.log(this.gitProcess.name + ' cloned');

      if (i < this.links.length - 1) {
        this.clone(++i);
      }
    });
  }

  twirlTimer(interval = 250) {
    const P = ['\\', '|', '/', '-'];
    let x = 0;
    return setInterval(() => {
      process.stdout.write('\r' + P[x++]);
      x &= 3;
    }, interval);
  }
}


module.exports = { Clone };
