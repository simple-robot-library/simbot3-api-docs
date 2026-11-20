import type {TagColor} from 'animal-island-vue'

const tagColors: Record<string, TagColor> = {
    info: 'app-teal',
    success: 'app-green',
    warning: 'app-yellow',
    error: 'app-red',
}

export function tagColor(type: string): TagColor {
    return tagColors[type] ?? 'default'
}
