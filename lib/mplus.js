'use babel';

import { CompositeDisposable } from 'atom';
import { exec } from 'child_process'

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
    console.log(file)
    exec('open "'+file+'"')
  }

};
