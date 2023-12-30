import { useEffect, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
} from '@codemirror/view'
import { indentOnInput } from '@codemirror/language'
import { defaultKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'

export function Editor({
  code,
  setCode,
}: {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}) {
  let editor = useRef(null)

  useEffect(() => {
    let onUpdate = EditorView.updateListener.of((v) => {
      setCode(v.state.doc.toString())
    })
    let startState = EditorState.create({
      doc: code,
      extensions: [
        keymap.of(defaultKeymap),
        lineNumbers(),
        indentOnInput(),
        highlightActiveLine(),
        javascript(),
        onUpdate,
      ],
    })

    let view: EditorView

    if (editor.current) {
      view = new EditorView({
        state: startState,
        parent: editor.current,
      })
    }

    return () => {
      view.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCode])

  return (
    <div ref={editor} className="flex-1 w-full leading-none bg-darkest"></div>
  )
}
