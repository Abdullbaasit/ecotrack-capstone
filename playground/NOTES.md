
# FE-05: Accessible Component Fundamentals

## Project Overview

This project demonstrates the implementation of three accessible React components using React and TypeScript without relying on a component library.

The components developed are:

1. Modal Dialog
2. Accessible Tabs
3. Disclosure (Expandable Section)

After implementing the components manually, shadcn/ui was installed using Base UI to examine how an established component system handles accessibility and reusable component structures.

## 1. Modal Dialog Comparison

### My Implementation

The manually developed Modal Dialog uses the native HTML dialog element.

It includes:
- Opening and closing through React state.
- Escape-key handling.
- Native modal focus management.
- Accessible title and description through ARIA attributes.
- Focus restoration to the opening button.

### What shadcn/ui Handles Better

The shadcn/Base UI implementation provides a more reusable dialog structure.

Specific improvements include:

1. Portal rendering: Dialog content is rendered through a portal, separating the dialog from the normal page layout and helping manage stacking and positioning.

2. Reusable dialog controls: DialogTrigger, DialogClose, DialogContent, DialogTitle and DialogDescription provide separate building blocks instead of requiring every developer to manage the entire dialog structure manually.

3. Built-in close button: The generated component includes an accessible close button with a screen-reader-only label.

## 2. Tabs Comparison

### My Implementation

The manually developed Tabs component includes:
- ARIA tablist, tab and tabpanel roles.
- Active tab management using React state.
- Arrow Left and Arrow Right navigation.
- Home and End keyboard navigation.
- Roving tab index.

### What shadcn/ui Handles Better

The shadcn/Base UI Tabs implementation provides:

1. Reusable component structure: Tabs, TabsList, TabsTrigger and TabsContent separate responsibilities and make the component easier to maintain.

2. Orientation support: The generated implementation supports horizontal and vertical tab arrangements.

3. Built-in keyboard interaction: Base UI manages tab interaction and accessibility behaviour, reducing the amount of manual keyboard-handling code.

## 3. Disclosure Comparison

### My Implementation

The Disclosure component uses React state to expand and collapse content.

It includes:
- A semantic button.
- The aria-expanded attribute.
- The aria-controls attribute.
- Keyboard interaction through native button behaviour.
- A labelled content region.

The component is intentionally simple and does not require an external library.

## 4. Lessons Learned

This exercise demonstrated that accessible components require more than visual styling.

Important lessons include:

- Semantic HTML improves accessibility.
- Keyboard navigation must be considered during component development.
- ARIA attributes communicate component states and relationships.
- Focus management is important when working with dialogs.
- Reusable components reduce repeated implementation work.
- Component libraries can provide established accessibility behaviour while still allowing developers to customise their interfaces.

## Conclusion

Building the components manually provided practical experience with React state, keyboard events, semantic HTML and ARIA attributes.

Comparing them with shadcn/ui demonstrated the value of reusable component architecture and established accessibility primitives.

The exercise improved my understanding of how to develop accessible, maintainable and reusable frontend components.
