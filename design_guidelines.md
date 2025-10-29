# Host a Move - Design Guidelines

## Design Approach

**Reference-Based Approach** drawing from modern event planning platforms (Partiful, Eventbrite) combined with clean productivity app aesthetics (Linear, Notion). This hybrid approach balances social engagement with functional event management, creating an approachable yet professional experience.

## Core Design Principles

1. **Social-First Warmth**: Friendly, inviting interface that encourages gathering and celebration
2. **Information Clarity**: Complex event data presented in digestible, scannable formats
3. **Action-Oriented**: Clear pathways to RSVPs, potluck claims, and event creation
4. **Mobile-Optimized**: Touch-friendly targets, thumb-zone considerations, swipe gestures

---

## Typography System

**Font Families**:
- Primary: Inter or DM Sans (headings, UI elements) - modern, clean sans-serif
- Secondary: System stack for body text (-apple-system, BlinkMacSystemFont, 'Segoe UI')

**Type Scale**:
- **Hero Headings (H1)**: text-4xl to text-5xl, font-bold (event names, page titles)
- **Section Headings (H2)**: text-2xl to text-3xl, font-semibold
- **Card Titles (H3)**: text-xl, font-semibold
- **Body Text**: text-base, font-normal, leading-relaxed
- **Captions/Meta**: text-sm, font-medium (dates, locations, counts)
- **Micro Copy**: text-xs (badges, timestamps, helper text)

**Emphasis Patterns**:
- Event names: Bold, slightly larger
- Dates/times: Medium weight with emoji prefixes for scannability
- User names in activity feeds: Semibold
- Status indicators: Uppercase, tracking-wide, text-xs

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistency
- Component padding: p-4, p-6, p-8
- Section gaps: gap-4, gap-6, gap-8
- Vertical rhythm: space-y-4, space-y-6, space-y-8
- Margin between major sections: mb-8, mb-12

**Container Strategy**:
- Mobile-first max-width: max-w-md (448px) for main content
- Tablet/Desktop: max-w-2xl to max-w-4xl depending on content density
- Full-width header/navigation components
- Centered content: mx-auto with px-4 for breathing room

**Grid Patterns**:
- Event cards: Single column on mobile, grid-cols-2 on md:, grid-cols-3 on lg: for dashboard
- RSVP stats: grid-cols-3 for Yes/Maybe/No counters
- Potluck items: Single column list, always
- Calendar grid: grid-cols-7 for week view

---

## Component Library

### Navigation & Headers

**Top Header**:
- Gradient background spanning full width
- py-6 to py-8 padding for presence
- Centered app title with subtitle (text-sm, opacity-90)
- Toggle switch component centered below title
- mb-0 (no margin, flows directly into content)

**Mode Toggle**:
- Pill-shaped container with rounded-full
- Three segments: Hosting | Attending | Past Events
- Active state: solid background with shadow-sm
- Inactive: transparent with reduced opacity
- px-4 py-2 on each button
- gap-1 between segments

**Bottom Navigation (if needed)**:
- Sticky bottom bar with border-top
- Icon + label format
- py-3 padding
- 4-5 core actions maximum

### Cards & Containers

**Event Card**:
- Rounded-xl (12px radius)
- p-4 to p-6 padding
- Shadow: shadow-sm default, shadow-md on hover
- Border: 2px transparent, accent on hover/active
- mb-4 spacing between cards
- Transform: -translate-y-1 on hover for lift effect

**Detail Sections**:
- Rounded-lg containers
- Alternating layouts: some full-width, some with side padding
- Dividers: border-b with subtle opacity between rows
- py-3 on individual rows

**Badge System**:
- Rounded-full pills
- px-3 py-1 sizing
- text-xs font-medium
- Shadow-sm for depth
- Positioned top-right or inline after titles

### Forms & Inputs

**Input Fields**:
- Rounded-lg (8px radius)
- px-4 py-3 comfortable touch targets
- Border: 1px with subtle default, accent on focus
- Label above: text-sm font-medium, mb-2
- Helper text below: text-xs, mt-1
- mb-6 spacing between input groups

**Textarea**:
- Same styling as inputs
- min-h-32 (128px) minimum height
- resize-y allowed

**Select Dropdowns**:
- Match input styling exactly
- Icon indicator on right side

**Buttons**:
- Primary CTA: rounded-lg, px-6 py-3, font-semibold, shadow-md
- Secondary: same sizing, different treatment
- Icon buttons: rounded-full, w-12 h-12 for consistent tap targets
- Full-width on mobile, inline on desktop where appropriate

**Toggle Switches**:
- 50px wide × 24px tall track
- 18px diameter thumb
- Smooth transition (transition-all duration-300)
- Used for settings, notifications, privacy controls

### Data Display

**RSVP Stats Container**:
- Three-column grid
- Each stat: centered text-align
- Number: text-3xl font-bold
- Label: text-xs uppercase tracking-wide, mt-1
- p-4 on container, rounded-lg

**Guest/Attendee Lists**:
- Avatar (if available) + name layout
- py-3 per item
- Border-b between items (not on last)
- Action buttons aligned right (Claim, Remove, etc.)
- Hover: subtle background change

**Potluck Items**:
- List format, never grid
- Item name: font-semibold, text-base
- Claimed by: text-sm, mt-1
- Claim button: inline, rounded-md, px-4 py-2
- Different visual state for claimed vs. unclaimed items

**Activity Feed**:
- Left-aligned with icon
- Icon: w-10 h-10 rounded-full, shrink-0
- Content: flex-1, ml-3
- Timestamp: text-xs, mt-1, reduced opacity
- py-3 per item, border-b separator

**Calendar View**:
- 7-column grid for days
- Each day: aspect-square, rounded-lg
- Days with events: distinct treatment, cursor-pointer
- Header row: text-xs uppercase, day names
- Gap-1 between cells

### Overlays & Modals

**Modal Dialogs**:
- Centered overlay with backdrop blur
- max-w-lg content width
- rounded-2xl container
- p-6 to p-8 padding
- Shadow-2xl for elevation
- Close button: absolute top-right

**Floating Action Button (FAB)**:
- Fixed bottom-right positioning
- w-14 h-14, rounded-full
- Shadow-lg with accent glow
- "+" icon, text-2xl
- bottom-20 right-6 (above nav if present)

---

## Responsive Behavior

**Breakpoint Strategy**:
- Mobile (default): Single column, full-width cards, stacked navigation
- Tablet (md: 768px): Two-column event grids, side-by-side forms
- Desktop (lg: 1024px): Three-column grids, multi-column layouts for event details

**Touch Targets**:
- Minimum 44×44px (h-11, w-11) for all interactive elements
- Increased padding on mobile: p-4 vs. p-6 on desktop
- Swipeable cards on mobile for quick actions

**Typography Scaling**:
- Headers: text-2xl mobile → text-3xl tablet → text-4xl desktop
- Body text remains text-base across breakpoints
- Tighter line-height on desktop (leading-normal vs. leading-relaxed on mobile)

---

## Images

**Hero Section**: Not applicable - this is a utility-focused app dashboard, not a marketing page. The gradient header serves as the visual anchor.

**Event Cards**: 
- Optional event cover images (16:9 ratio) at top of detailed view
- rounded-t-xl to match card rounding
- h-48 to h-64 height
- Object-cover for proper scaling
- Fallback: gradient or emoji-based placeholder

**User Avatars**:
- Circular, w-10 h-10 standard size (w-8 h-8 for compact lists)
- First letter fallback for users without photos
- Ring-2 border for visual separation

**Empty States**:
- Illustration or icon-based (not photo-realistic)
- Centered, max-w-xs
- Accompanied by text-lg heading and text-sm helper text

---

## Interaction Patterns

**Card Interactions**:
- Hover: Lift (transform) + shadow increase + border accent
- Click: Navigate to detail view
- Long-press (mobile): Quick actions menu

**List Item Actions**:
- Swipe-left on mobile reveals actions (Delete, Edit)
- Desktop: Hover shows inline action buttons
- Confirmation for destructive actions

**Form Validation**:
- Inline validation on blur
- Error states: border accent + text-sm message below (text-red-600 equivalent)
- Success states: checkmark icon inline

**Loading States**:
- Skeleton screens matching content structure
- Pulse animation (animate-pulse)
- For lists: 3-5 skeleton items

**Animations**: Minimal and purposeful
- Transitions: duration-200 to duration-300
- Transforms on hover only
- No scroll-triggered animations
- Loading spinners: simple rotation

---

## Accessibility Considerations

- Focus states: 2px ring with offset on all interactive elements
- High contrast ratios maintained across all text
- Form labels always visible, never placeholder-only
- ARIA labels for icon-only buttons
- Keyboard navigation: logical tab order, escape to close modals
- Screen reader text for status updates ("12 people attending")