# Directive: Project "Faceted Horizons" - Layered 2D Immersive Journey

## 1. Executive Summary & Core Objective

**Objective:** Construct a single-page scrolling website that takes the user on a visual journey through distinct "Warm Faceted Topography" landscapes.

**Core Concept:** The site is a series of stacked, full-screen sections. Each section features a high-quality, pre-rendered 3D illustration as its background. Foreground UI elements (cards, text, forms) are standard HTML/CSS that "float" over these backgrounds.

**The "Journey" Mechanic:** The sense of depth and journey is achieved through **parallax scrolling**—where foreground elements move faster than the background—and smooth transitions between the different landscape scenes as the user scrolls down. It must feel grounded, heavy, and engineered, not light or airy.

## 2. Technical Stack & Architecture

* **Framework:** Standard HTML/CSS/JS or a lightweight framework like React or Vue for component management.
* **Animation Engine (Crucial):** **GSAP (GreenSock Animation Platform)** with **ScrollTrigger**. This is mandatory for achieving the high-quality pinning and parallax effects required to mimic 3D depth.
* **Asset Pipeline:** High-resolution (`2560px+` width), pre-rendered JPEG/WEBP images created in the "Warm Faceted Topography" style.

---

## 3. Phase 1: Asset Generation (The Scenes)

The agent must first generate four distinct background scenes that tell a visual story of progressing from a wide view into a focused destination.

**General Style Prompt Suffix for all images:** "...in the style of Warm Faceted Topography, low-poly chiseled geology, matte terracotta and ochre landscape, glowing golden data lines cutting through, isometric-inspired perspective but suitable for a wide webpage background, high contrast, dramatic warm lighting."

### Scene 1: The Vista (Hero Section)
* **Concept:** A wide, expansive view looking down over a vast landscape of faceted mountains and valleys. The "data river" starts here in the distance.
* **Prompt:** "A wide, expansive landscape background image. Towering, chiseled low-poly mountains in warm terracotta and beige hues. A glowing river of molten gold light snakes from the distant horizon towards the foreground viewer. [Add Suffix]"

### Scene 2: The Approach (About/Philosophy Section)
* **Concept:** Moving closer. The viewpoint is mid-altitude, moving between large canyon walls.
* **Prompt:** "A landscape background image from inside a massive, chiseled canyon. Huge geometric rock faces on the left and right block the distant view. The glowing data river is wider here on the canyon floor, flowing past engineered rock formations. [Add Suffix]"

### Scene 3: The Engine Room (Portfolio/Work Section)
* **Concept:** The core of the operation. A scene showing structured activity.
* **Prompt:** "A landscape background image focused on a massive, low-poly geothermal data processing plant built into the rock. Faceted cooling towers and geometric structures emit golden light. Multiple glowing pathways converge here. It feels industrious and engineered. [Add Suffix]"

### Scene 4: The Destination (Contact Section)
* **Concept:** Arrival. A focused, grounded scene at the end of the path.
* **Prompt:** "A landscape background image showing the terminus of the glowing river. It flows into a calm, glowing golden 'data lake' surrounded by faceted rock banks. A singular, chiseled monolith structure stands at the edge of the lake, glowing warmly. [Add Suffix]"

---

## 4. Phase 2: Construction Guidelines

### 4.1. The Layered Structure (HTML/CSS)
Each section of the website must follow this DOM structure to allow for the layered effect:

```html
<section class="scene-container" id="hero-section">
    <div class="parallax-bg" style="background-image: url('scene-1-vista.jpg')"></div>
    
    <div class="atmosphere-layer"></div>
    
    <div class="foreground-content">
        <h1>Title text here</h1>
        <div class="card-container">...cards...</div>
    </div>
</section>
```

### 4.2. The Parallax Behavior (GSAP ScrollTrigger)
The agent must implement ScrollTrigger to create depth.

The Background: The .parallax-bg should move slightly slower than the scroll speed (e.g., yPercent: 20 over the duration of the section scroll). This makes it feel distant and massive.

The Foreground: The .foreground-content should move at normal scroll speed or slightly faster than scroll speed to feel closer to the viewer.

### 4.3. UI Element Styling (The "Floating" Cards)
The foreground elements must match the visual identity so they don't look like alien HTML blobs floating over the artwork.

**Card Styling:**

**Background:** Not pure white. Use a matte, opaque "Muted Sandstone" (#E6BFA3) or a very deep, warm dark brown (#4A3B32) for contrast.

**Border:** A thick, chiseled border using a lighter ochre tone to simulate a beveled edge.

**Shadow:** A sharp, hard-edged drop shadow (not a soft blur) in a deep terracotta tone to make it feel heavy and physical.

**Glow:** A subtle inner glow of "Hot Amber" on hover states.

**Forms (Contact Section):** Input fields should look like engineered slots cut into stone, with glowing edges when active.

### 4.4. Section Transitions
As the user scrolls from Scene 1 to Scene 2:

Avoid jarring cuts.

Use GSAP to pin the outgoing scene briefly while the incoming scene overlaps it, perhaps with a slight cross-fade or a "wipe" effect that follows the angle of the faceted geology.