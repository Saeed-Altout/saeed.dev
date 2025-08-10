import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { TextStyle } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";

import { cn } from "@/lib/utils";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link2 as LinkIcon,
  Minus,
  Plus,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

interface RichTextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  className?: string;
}

export const RichTextEditor = ({
  value = "",
  onChange,
  className,
}: RichTextEditorProps) => {
  const insertWordBreaks = (html: string, maxWordLength = 30): string => {
    return html.replace(
      new RegExp(`([^\\s]{${maxWordLength},})`, "g"),
      (match) => {
        return match.replace(
          new RegExp(`(.{${maxWordLength}})`, "g"),
          "$1<wbr>"
        );
      }
    );
  };

  const handleEditorUpdate = (editorInstance: Editor) => {
    if (!onChange) return;
    const html = editorInstance.getHTML();
    const htmlWithBreaks = insertWordBreaks(html, 30);
    onChange(htmlWithBreaks);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      TextStyle,
      FontFamily,
      FontSize.configure({ types: ["textStyle"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      handleEditorUpdate(editor);
    },
    editorProps: {
      attributes: {
        class:
          "flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 break-words whitespace-pre-wrap w-full word-break break-all overflow-x-auto",
      },
    },
  });

  if (!editor) return null;

  const handleSetLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleFontSize = (increase: boolean) => {
    const currentSizeAttr = editor.getAttributes("textStyle").fontSize;
    let currentSizePt = 12;
    if (
      currentSizeAttr &&
      typeof currentSizeAttr === "string" &&
      currentSizeAttr.endsWith("pt")
    ) {
      currentSizePt = parseInt(currentSizeAttr.replace("pt", ""), 10) || 12;
    }
    const step = 2;
    const newSizePt = increase
      ? currentSizePt + step
      : Math.max(step, currentSizePt - step);
    editor.chain().focus().setFontSize(`${newSizePt}pt`).run();
  };

  return (
    <div
      className={cn(
        "w-full h-fit rounded-md border border-input bg-background",
        className
      )}
    >
      <div className="flex items-center gap-2 justify-start p-2">
        <ToggleGroup
          type="multiple"
          size="sm"
          value={["bold", "italic", "underline"].filter((mark) =>
            editor.isActive(mark)
          )}
          onValueChange={(values) => {
            ["bold", "italic", "underline"].forEach((mark) => {
              const isActive = editor.isActive(mark);
              const shouldBeActive = values.includes(mark);
              if (isActive !== shouldBeActive) {
                switch (mark) {
                  case "bold":
                    editor.chain().focus().toggleBold().run();
                    break;
                  case "italic":
                    editor.chain().focus().toggleItalic().run();
                    break;
                  case "underline":
                    editor.chain().focus().toggleUnderline().run();
                    break;
                }
              }
            });
          }}
        >
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            disabled={!editor.can().toggleBold()}
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            disabled={!editor.can().toggleItalic()}
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            disabled={!editor.can().toggleUnderline()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="!h-6" />

        <Toggle
          size="sm"
          aria-label="Decrease font size"
          onPressedChange={() => handleFontSize(false)}
          className="relative"
        >
          <Minus className="!h-2 !w-2 absolute top-1 right-1" />A
        </Toggle>
        <Toggle
          size="sm"
          aria-label="Increase font size"
          onPressedChange={() => handleFontSize(true)}
          className="relative"
        >
          <Plus className="!h-2 !w-2 absolute top-1 right-1" />A
        </Toggle>

        <Separator orientation="vertical" className="!h-6" />

        <ToggleGroup
          type="single"
          size="sm"
          value={
            ["left", "center", "right"].find((align) =>
              editor.isActive({ textAlign: align })
            ) || "left"
          }
          onValueChange={(value) => {
            if (value) {
              editor.chain().focus().setTextAlign(value).run();
            }
          }}
        >
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="!h-6" />
        <Toggle
          size="sm"
          aria-label="Set link"
          pressed={editor.isActive("link")}
          onPressedChange={handleSetLink}
        >
          <LinkIcon className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="!h-6" />

        <ToggleGroup
          type="multiple"
          size="sm"
          value={["bulletList", "orderedList"].filter((list) =>
            editor.isActive(list)
          )}
          onValueChange={(values) => {
            ["bulletList", "orderedList"].forEach((listType) => {
              const isActive = editor.isActive(listType);
              const shouldBeActive = values.includes(listType);
              if (isActive !== shouldBeActive) {
                switch (listType) {
                  case "bulletList":
                    editor.chain().focus().toggleBulletList().run();
                    break;
                  case "orderedList":
                    editor.chain().focus().toggleOrderedList().run();
                    break;
                }
              }
            });
          }}
        >
          <ToggleGroupItem value="bulletList">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="orderedList">
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="p-2 max-w-full">
        <EditorContent
          editor={editor}
          className={cn(
            "break-words whitespace-pre-wrap w-full word-break break-all overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        />
      </div>
    </div>
  );
};

RichTextEditor.displayName = "RichTextEditor";
