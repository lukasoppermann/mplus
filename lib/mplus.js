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
    file = editor.buffer.file
    filename = file.getBaseName()
    atom.notifications.addInfo('Running '+filename)

    exec('/Applications/Mplus/mplus "'+file.path+'" && ' + " atom ${file.path/.inp/.out}")
    .then(function (result) {
        atom.notifications.addSuccess(filename+' successfully run')
    })
    .catch(function (err) {
        atom.notifications.addError('Error while running '+filename+'<br />'+err)
    });
  }

};
