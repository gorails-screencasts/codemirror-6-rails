import { Controller } from "@hotwired/stimulus"
import {basicSetup, EditorView} from "codemirror"
import {autocompletion} from "@codemirror/autocomplete"
import { json } from "@codemirror/lang-json"

import {StreamLanguage} from "@codemirror/language"
import {ruby} from "@codemirror/legacy-modes/mode/ruby"

export default class extends Controller {
  static targets = ["editor", "input"]
  static values = {
    doc: String
  }

  connect() {
    this.editor = new EditorView({
      doc: this.docValue,
      extensions: [
        basicSetup,
        StreamLanguage.define(ruby),
        json(),
        autocompletion({override: [this.completions]}),
        EditorView.updateListener.of((view) => {
          if (view.docChanged) { this.sync() }
        })
      ],
      parent: this.editorTarget
    })
  }

  disconnect() {
    this.editor.destroy()
  }

  sync() {
    this.inputTarget.value = this.editor.state.doc.toString()
  }

  completions(context) {
    let word = context.matchBefore(/\w*/)
    if (word.from == word.to && !context.explicit)
      return null

    return {
      from: word.from,
      options: [
        { label: "User", type: "constant", info: "The User model" }
      ]
    }
  }
}
