# TeamFlow UI Design System

## Brand Identity

### Color Palette

#### Primary Colors
- **Primary Blue (#2563EB)**: Main brand color, used for primary actions and key UI elements
- **Deep Navy (#1E40AF)**: Used for headers and important UI elements
- **Light Blue (#DBEAFE)**: Used for backgrounds, hover states, and secondary elements

#### Secondary Colors
- **Success Green (#10B981)**: Used for success states, completed tasks
- **Warning Amber (#F59E0B)**: Used for warnings, at-risk tasks
- **Error Red (#EF4444)**: Used for errors, blocked tasks
- **Purple (#8B5CF6)**: Used for AI-related features and insights

#### Neutral Colors
- **Dark Gray (#1F2937)**: Used for primary text
- **Medium Gray (#6B7280)**: Used for secondary text
- **Light Gray (#E5E7EB)**: Used for borders and dividers
- **Off-White (#F9FAFB)**: Used for backgrounds

### Typography

#### Headings
- **Font Family**: Inter, sans-serif
- **Weights**: 700 (Bold), 600 (Semibold)
- **Sizes**:
  - H1: 32px/40px
  - H2: 24px/32px
  - H3: 20px/28px
  - H4: 18px/24px
  - H5: 16px/24px

#### Body Text
- **Font Family**: Inter, sans-serif
- **Weights**: 400 (Regular), 500 (Medium)
- **Sizes**:
  - Body Large: 16px/24px
  - Body: 14px/20px
  - Body Small: 12px/16px

#### Code
- **Font Family**: Roboto Mono, monospace
- **Weight**: 400 (Regular)
- **Size**: 14px/20px

### Iconography

- **Style**: Outlined with 2px stroke, rounded corners
- **Size**: 24px × 24px (standard), 16px × 16px (compact)
- **Colors**: Inherit from text color or specific semantic colors

## Components

### Buttons

#### Primary Button
- Background: Primary Blue
- Text: White
- Hover: Darker shade of Primary Blue
- Active: Even darker shade of Primary Blue
- Disabled: Light Gray background, Medium Gray text

#### Secondary Button
- Background: White
- Border: Light Gray
- Text: Dark Gray
- Hover: Light Blue background
- Active: Slightly darker Light Blue background
- Disabled: Light Gray background, Medium Gray text

#### Tertiary Button
- Background: Transparent
- Text: Primary Blue
- Hover: Light Blue background
- Active: Slightly darker Light Blue background
- Disabled: Medium Gray text

### Input Fields

#### Text Input
- Border: Light Gray
- Focus: Primary Blue border
- Error: Error Red border
- Placeholder: Medium Gray text
- Text: Dark Gray
- Background: White

#### Dropdown
- Same styling as Text Input
- Dropdown icon: Medium Gray
- Options background: White
- Selected option: Light Blue background

### Cards

#### Task Card
- Background: White
- Border: Light Gray
- Shadow: Subtle drop shadow
- Hover: Slightly elevated shadow
- Selected: Light Blue border

#### Dashboard Card
- Background: White
- Border: None
- Shadow: Medium drop shadow
- Header: Optional colored top border or background

### Navigation

#### Sidebar
- Background: White
- Active item: Light Blue background, Primary Blue text
- Hover item: Very Light Blue background
- Text: Dark Gray (inactive), Primary Blue (active)

#### Tabs
- Background: Transparent
- Active tab: Border bottom Primary Blue, Dark Gray text
- Inactive tab: No border, Medium Gray text
- Hover tab: Light Blue background

### Feedback Indicators

#### Progress Bar
- Background: Light Gray
- Fill: Primary Blue (default), Success Green (completed), Warning Amber (at risk)
- Height: 8px
- Border Radius: 4px

#### Status Indicators
- Completed: Success Green dot
- In Progress: Primary Blue dot
- At Risk: Warning Amber dot
- Blocked: Error Red dot
- Not Started: Light Gray dot

#### Toast Notifications
- Success: Success Green background
- Warning: Warning Amber background
- Error: Error Red background
- Info: Light Blue background
- Text: White or Dark Gray depending on contrast

## Layout

### Grid System
- 12-column grid
- Gutter: 24px
- Margin: 24px (desktop), 16px (tablet), 8px (mobile)

### Spacing
- 4px base unit
- Spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### Breakpoints
- Mobile: 0-639px
- Tablet: 640px-1023px
- Desktop: 1024px+

### Container Widths
- Small: 640px max
- Medium: 768px max
- Large: 1024px max
- Extra Large: 1280px max

## Accessibility

### Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Large text on background: Minimum 3:1 ratio
- UI components and graphical objects: Minimum 3:1 ratio against adjacent colors

### Focus States
- Visible focus indicator for all interactive elements
- Focus indicator: 2px Primary Blue outline with 2px offset

### Screen Reader Support
- Proper ARIA labels for all interactive elements
- Semantic HTML structure
- Alternative text for all images and icons

## Animation and Transitions

### Timing
- Quick: 100ms
- Standard: 200ms
- Emphasis: 300ms

### Easing
- Standard: ease-in-out
- Enter: ease-out
- Exit: ease-in

### Motion Principles
- Subtle and purposeful
- Reinforce user actions
- Provide visual feedback
- Never block user interaction
