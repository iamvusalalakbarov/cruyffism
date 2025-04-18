"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Quote, LinkIcon } from "lucide-react"

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TextEditor({ value, onChange, placeholder = "Write your content here..." }: TextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkText, setLinkText] = useState("")
  const [linkUrl, setLinkUrl] = useState("")

  const handleCommand = (command: string) => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let result = value

    switch (command) {
      case "bold":
        result = value.substring(0, start) + `**${selectedText}**` + value.substring(end)
        break
      case "italic":
        result = value.substring(0, start) + `*${selectedText}*` + value.substring(end)
        break
      case "h1":
        result = value.substring(0, start) + `\n## ${selectedText}\n` + value.substring(end)
        break
      case "h2":
        result = value.substring(0, start) + `\n### ${selectedText}\n` + value.substring(end)
        break
      case "h3":
        result = value.substring(0, start) + `\n#### ${selectedText}\n` + value.substring(end)
        break
      case "quote":
        result = value.substring(0, start) + `\n> ${selectedText}\n` + value.substring(end)
        break
      case "ul":
        result = value.substring(0, start) + `\n- ${selectedText}\n` + value.substring(end)
        break
      case "ol":
        result = value.substring(0, start) + `\n1. ${selectedText}\n` + value.substring(end)
        break
      case "link":
        setShowLinkInput(true)
        setLinkText(selectedText)
        break
    }

    onChange(result)
  }

  const insertLink = () => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const linkMarkdown = `[${linkText}](${linkUrl})`
    const result = value.substring(0, start) + linkMarkdown + value.substring(end)

    onChange(result)
    setShowLinkInput(false)
    setLinkText("")
    setLinkUrl("")
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 border-b">
        <Button type="button" variant="ghost" size="icon" onClick={() => handleCommand("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleCommand("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
        <Button type="button" variant="ghost" size="icon" onClick={() => handleCommand("h1")} title="Heading 2">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleCommand("h2")} title="Heading 3">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleCommand("h3")} title="Heading 4">
          <Heading3 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
        <Button type="button" variant="ghost" size="icon" onClick={() => handleCommand("ul")} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleCommand("ol")} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
        <Button type="button" variant="ghost" size="icon" onClick={() => handleCommand("quote")} title="Quote">
          <Quote className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleCommand("link")} title="Link">
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>

      {showLinkInput && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b flex flex-wrap gap-2 items-center">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Link text"
              className="w-full px-3 py-1 text-sm border rounded"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="URL"
              className="w-full px-3 py-1 text-sm border rounded"
            />
          </div>
          <Button type="button" size="sm" onClick={insertLink} className="bg-orange-600 hover:bg-orange-700">
            Insert
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setShowLinkInput(false)}>
            Cancel
          </Button>
        </div>
      )}

      <textarea
        id="editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[400px] p-4 resize-y font-mono text-sm focus:outline-none dark:bg-gray-800"
      />

      <div className="p-2 bg-gray-50 dark:bg-gray-800 border-t text-xs text-gray-500 dark:text-gray-400">
        Markdown supported. Use the toolbar or write markdown directly.
      </div>
    </div>
  )
}
