'use babel';

import { CompositeDisposable } from 'atom';
import { exec } from 'child-process-promise'

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mplus:run': () => this.run()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  run() {
    editor = atom.workspace.getActivePaneItem()
    buffer = editor.getBuffer()
    file = editor.buffer.file
    filename = file.getBaseName()
    outputfile = file.path.slice(0,-4) + '.out'

    if(file.path.substr(-4) !== '.inp'){
      atom.notifications.addError('Cannot compile '+filename+'<br />', {
        dismissable: true,
      })
      return;
    }

    buffer.save()

    exec("/Applications/Mplus/mplus '"+file.path+"'")
    .then(function (result) {
        atom.workspace.open(outputfile)
    })
    .catch(function (err) {
        atom.notifications.addError('Error while running '+filename+'<br />'+err, {
          dismissable: true,
        })
        atom.workspace.open(outputfile)
    });
  }

};
