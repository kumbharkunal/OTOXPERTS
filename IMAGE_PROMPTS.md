# Image prompts for the OtoXperts homepage

Eight photographs for the homepage. Each prompt below is complete on its own.

## How to use

1. Open a **fresh ChatGPT chat** for each image. The one exception is image 2, which starts by attaching image 1.
2. Click copy on the prompt block, paste it, and generate.
3. Regenerate if you see any of these:
   - text or numbers
   - a logo or badge
   - odd hands or faces
   - a "3D render" look
4. Download the result as **PNG**.
5. Rename the file to the **Save as** name and drop it into `_incoming-images/` in the project. The leading number is what matters: `01.png` works too.
6. Tell Claude. It runs `npm run images`, which crops, resizes and optimises each file into `public/images/`. You don't need to change any code: placeholders at the same aspect ratio are already in the page.

If ChatGPT can't produce the exact pixel size, download the largest size it offers in the same orientation; the script handles cropping. The hero callouts get recalibrated once the real photo lands.

## Image list

| # | Save as | Final file | Used in | Ratio | Pixels |
|---|---|---|---|---|---|
| 1 | `01-hero-bay.png` | `public/images/hero-bay.jpg` | Hero on screens 768 px and wider | 16:9 landscape | 2560 × 1440 |
| 2 | `02-hero-bay-mobile.png` | `public/images/hero-bay-mobile.jpg` | Hero on phones (under 768 px) | 9:16 portrait | 1080 × 1920 |
| 3 | `03-stockyard.png` | `public/images/stockyard.jpg` | "A new car can arrive already repaired" section | 4:5 portrait | 1600 × 2000 |
| 4 | `04-engineer-walkround.png` | `public/images/engineer-walkround.jpg` | "How it works" section | 3:2 landscape | 2400 × 1600 |
| 5 | `05-detail-paint-gauge.png` | `public/images/detail-paint-gauge.jpg` | Sample report photo; "What we check": paint | 1:1 square | 1200 × 1200 |
| 6 | `06-detail-tread-gauge.png` | `public/images/detail-tread-gauge.jpg` | Sample report photo; "What we check": tyres | 1:1 square | 1200 × 1200 |
| 7 | `07-detail-obd.png` | `public/images/detail-obd.jpg` | Sample report photo; "What we check": electrics | 1:1 square | 1200 × 1200 |
| 8 | `08-detail-underbody.png` | `public/images/detail-underbody.jpg` | Sample report photo; "What we check": underbody | 1:1 square | 1200 × 1200 |

All eight share one look:
- cool neutral daylight balance, slightly desaturated
- deep blacks and fine grain
- India
- generic unbadged right-hand-drive cars with blank plates
- engineers in plain black polos with thin red accents and no logos

The real OtoXperts logo is added in code, never in the photos.

---

## 1. Hero, desktop: the night delivery bay

- **Save as:** `_incoming-images/01-hero-bay.png`
- **Final file:** `public/images/hero-bay.jpg`
- **Used in:** the hero on screens 768 px and wider. The page darkens this photo to about 30% brightness, and the visitor's "inspection light" reveals it at normal brightness. That's why the car must be well lit and sharp.
- **Aspect ratio:** 16:9, landscape
- **Size:** 2560 × 1440 px
- **Download:** PNG

```text
Create a photorealistic photograph. Format: PNG. Orientation: landscape. Aspect ratio: 16:9. Size: 2560 × 1440 pixels. If you cannot output that exact size, use the largest 16:9 landscape size you can, keeping every important element inside the frame as described.

Scene: a brand-new white compact SUV inside a car dealership delivery bay in India, at night. The car is a modern, generic, unbadged design with no logos, emblems or model names anywhere. It is right-hand drive and has a blank white number plate with no characters on it.

Composition: the car sits in the right 55% of the frame at a three-quarter front angle, its nose pointing towards the left of the frame, so the front bumper, the left front wheel and the whole left side with both doors are visible. The complete car is in frame, with a little space above the roof and below the tyres. The left 45% of the frame is quiet, empty, near-black wall and floor with no objects, signs or lights; this space is reserved for a large headline. Camera at bumper height, 35 mm lens, f/5.6, everything on the car in sharp focus.

Lighting: the car itself is evenly and clearly lit by a large soft light from the front left, as if an inspector's lamp is on it. The paint texture, reflections, panel gaps, bumper corner, alloy wheels and tyre sidewalls all show crisp detail. The surroundings fall off into deep shadow: a smooth grey epoxy concrete floor with faint reflections, plain dark grey walls, a closed roller shutter far behind the car, and no visible light fixtures.

Small, realistic imperfections that an inspector would find: the rear left door has a very slightly different gloss and a finer orange-peel texture than the front door (a respray), and the front left bumper corner has a faint scuff that has been polished over. Keep both subtle, visible only on close inspection.

Look: editorial automotive photography, cool neutral white balance (about 5200 K), slightly desaturated, deep clean blacks, crisp highlights, fine natural grain. Calm and precise, not glossy advertising.

Do not include: any text, letters, numbers, watermarks, logos, emblems or brand badges (on the car, the plate, the walls or anywhere); people; distorted or melted shapes; a CGI, 3D render or illustration look; lens flare; HDR halos; dramatic coloured lighting.
```

---

## 2. Hero, mobile: the same bay, recomposed for a phone

- **Save as:** `_incoming-images/02-hero-bay-mobile.png`
- **Final file:** `public/images/hero-bay-mobile.jpg`
- **Used in:** the hero on phones (under 768 px). Same treatment as image 1.
- **Aspect ratio:** 9:16, portrait
- **Size:** 1080 × 1920 px
- **Download:** PNG

```text
Attach the image from prompt 1 to this chat first.

Edit the attached photograph into a new vertical version. Format: PNG. Orientation: portrait. Aspect ratio: 9:16. Size: 1080 × 1920 pixels. If you cannot output that exact size, use the largest 9:16 portrait size you can.

Keep everything identical to the attached image: the same white unbadged SUV (same shape, wheels and colour, and the same subtle imperfections on the rear left door and the front left bumper corner), the same delivery bay, floor and walls, and the same lighting direction and colour grade.

Recompose for a phone screen. Show the car at the same three-quarter front angle with its nose pointing left, slightly further from the camera so the whole car fits across the width with a small margin on both sides. Place the car in the lower 45% of the frame, with the tyres about 10% above the bottom edge. The top 50% of the frame must be quiet, empty, near-black wall with no objects, signs or lights; this space is reserved for a headline and buttons.

Look: editorial automotive photography, cool neutral white balance (about 5200 K), slightly desaturated, deep clean blacks, crisp highlights, fine natural grain.

Do not include: any text, letters, numbers, watermarks, logos, emblems or brand badges; people; distorted or melted shapes; a CGI, 3D render or illustration look; lens flare.
```

---

## 3. Stockyard in daylight

- **Save as:** `_incoming-images/03-stockyard.png`
- **Final file:** `public/images/stockyard.jpg`
- **Used in:** the "A new car can arrive already repaired" section, beside the text. It shows where transit damage happens.
- **Aspect ratio:** 4:5, portrait
- **Size:** 1600 × 2000 px
- **Download:** PNG

```text
Create a photorealistic documentary photograph. Format: PNG. Orientation: portrait. Aspect ratio: 4:5. Size: 1600 × 2000 pixels. If you cannot output that exact size, use the largest 4:5 portrait size you can.

Scene: a large open-air new-car stockyard on the edge of an Indian city in early morning daylight. Long, tight rows of brand-new, generic, unbadged hatchbacks and compact SUVs in white, silver, grey and dark red. All are right-hand drive, with blank number plates that have no characters. Several cars still wear white protective transport film on the bonnet and roof, and a thin layer of dust sits on the paint. In the background, partly visible, is a two-deck car-carrier truck loaded with cars. The sky is hazy and pale; the ground is packed earth and concrete with tyre tracks.

Composition: shot from a slightly raised position (about 3 metres high) with a 50 mm lens at f/8. The rows lead the eye diagonally into the frame, and the nearest cars fill the lower third. Quiet and observational, nothing staged.

Look: editorial documentary photography, cool neutral white balance (about 5200 K), slightly desaturated, deep clean blacks, crisp highlights, fine natural grain.

Do not include: any text, letters, numbers, watermarks, logos, emblems or brand badges (on the cars, trucks, signs or anywhere); people in the foreground; distorted shapes; a CGI, 3D render or illustration look; lens flare; HDR halos.
```

---

## 4. Engineer walk-round on a dealership forecourt

- **Save as:** `_incoming-images/04-engineer-walkround.png`
- **Final file:** `public/images/engineer-walkround.jpg`
- **Used in:** the "How it works" section, beside the five steps.
- **Aspect ratio:** 3:2, landscape
- **Size:** 2400 × 1600 px
- **Download:** PNG

```text
Create a photorealistic editorial photograph. Format: PNG. Orientation: landscape. Aspect ratio: 3:2. Size: 2400 × 1600 pixels. If you cannot output that exact size, use the largest 3:2 landscape size you can.

Scene: an Indian automotive inspection engineer, a man in his late twenties with short dark hair. He wears a plain black polo shirt with a thin red stripe on the collar and sleeve cuffs, dark grey work trousers and black safety shoes, with no logos or printed text on any clothing. He walks slowly along the left side of a brand-new dark grey compact SUV on a dealership forecourt in soft overcast daylight, holding a tablet in his left hand and a small black inspection torch in his right, studying the rear door panel closely. The car is modern, generic and unbadged, right-hand drive, with a blank number plate that has no characters.

Composition: the engineer stands in the left third of the frame; the car runs across the middle and right. Camera at chest height, 50 mm lens at f/2.8. The background, a glass dealership facade with no signage, is softly blurred. A candid working moment, not posed for the camera. Natural hands with five fingers each, and a natural face.

Look: editorial photography, cool neutral white balance (about 5200 K), slightly desaturated, deep clean blacks, crisp highlights, fine natural grain.

Do not include: any text, letters, numbers, watermarks, logos, emblems or brand badges (on clothing, the car, the tablet, signs or anywhere); a readable tablet screen; distorted hands, fingers or faces; a CGI, 3D render or illustration look; lens flare.
```

---

## 5. Detail: paint thickness gauge on a door

- **Save as:** `_incoming-images/05-detail-paint-gauge.png`
- **Final file:** `public/images/detail-paint-gauge.jpg`
- **Used in:** a photo in the sample report, and the "Paint and body" panel of "What we check".
- **Aspect ratio:** 1:1, square
- **Size:** 1200 × 1200 px
- **Download:** PNG

```text
Create a photorealistic macro photograph. Format: PNG. Orientation: square. Aspect ratio: 1:1. Size: 1200 × 1200 pixels. If you cannot output that exact size, use the largest square size you can.

Scene: an extreme close-up of a handheld paint thickness gauge in use on a car. A hand in a thin black nitrile glove presses the gauge's small round metal probe flat against the glossy door panel of a brand-new dark grey metallic car. The edge of a door shut line runs diagonally through the frame. The gauge body is plain matte black with no markings. Its small screen is turned away from the camera or completely out of focus, so nothing on it can be read.

Composition: 100 mm macro lens at f/5.6 with shallow depth of field. The probe and the metallic flakes in the paint are in sharp focus; the rest falls away softly. Soft daylight from the side shows the paint's fine orange-peel texture and the sky's reflection.

Look: editorial product photography, cool neutral white balance (about 5200 K), slightly desaturated, deep clean blacks, crisp highlights, fine natural grain.

Do not include: any text, letters, numbers, watermarks, logos or brand marks (on the gauge, glove, car or anywhere); a readable screen; distorted fingers; a CGI, 3D render or illustration look.
```

---

## 6. Detail: tread depth gauge in a new tyre

- **Save as:** `_incoming-images/06-detail-tread-gauge.png`
- **Final file:** `public/images/detail-tread-gauge.jpg`
- **Used in:** a photo in the sample report, and the "Tyres and wheels" panel of "What we check".
- **Aspect ratio:** 1:1, square
- **Size:** 1200 × 1200 px
- **Download:** PNG

```text
Create a photorealistic macro photograph. Format: PNG. Orientation: square. Aspect ratio: 1:1. Size: 1200 × 1200 pixels. If you cannot output that exact size, use the largest square size you can.

Scene: a close-up of a brand-new car tyre on an alloy wheel, photographed in daylight in a stockyard. A hand in a thin black nitrile glove inserts the thin steel pin of a plain metal tread depth gauge into the main groove of the tread. The rubber is fresh and dark, with the tiny moulding vent spikes still on its surface. The moulded lettering on the tyre sidewall is out of frame or completely out of focus, so nothing can be read.

Composition: 100 mm macro lens at f/5.6 with shallow depth of field. The gauge pin and the tread blocks are in sharp focus. The camera sits slightly above the tyre, looking across the tread.

Look: editorial product photography, cool neutral white balance (about 5200 K), slightly desaturated, deep clean blacks, crisp highlights, fine natural grain.

Do not include: any readable text, letters, numbers, scale markings, watermarks, logos or brand marks (on the tyre, gauge, wheel or anywhere); distorted fingers; a CGI, 3D render or illustration look.
```

---

## 7. Detail: OBD scanner plugged in under the dashboard

- **Save as:** `_incoming-images/07-detail-obd.png`
- **Final file:** `public/images/detail-obd.jpg`
- **Used in:** a photo in the sample report, and the "Electrics and scan" panel of "What we check".
- **Aspect ratio:** 1:1, square
- **Size:** 1200 × 1200 px
- **Download:** PNG

```text
Create a photorealistic close-up photograph. Format: PNG. Orientation: square. Aspect ratio: 1:1. Size: 1200 × 1200 pixels. If you cannot output that exact size, use the largest square size you can.

Scene: the area under the dashboard of a brand-new right-hand-drive car, below the steering column on the driver's side. A compact black OBD-II diagnostic plug is connected to the car's trapezoid-shaped OBD port, with a thin black cable running from it out of the frame. Clean, new dark grey interior plastics, with a little of the floor carpet and the pedal area visible. The scanner's screen is not in the picture.

Composition: 50 mm macro lens at f/4. The plug and port are in sharp focus; the rest falls away. A soft, cool torch beam from the lower left plus dim ambient light, as if an inspector is looking under the dashboard.

Look: editorial photography, cool neutral white balance (about 5200 K), slightly desaturated, deep clean blacks, crisp highlights, fine natural grain.

Do not include: any text, letters, numbers, watermarks, logos or brand marks (on the plug, cable, dashboard or anywhere); any visible screen; distorted hands or fingers; a CGI, 3D render or illustration look.
```

---

## 8. Detail: torch under the car, transport scrape

- **Save as:** `_incoming-images/08-detail-underbody.png`
- **Final file:** `public/images/detail-underbody.jpg`
- **Used in:** a photo in the sample report, and the "Underbody and suspension" panel of "What we check".
- **Aspect ratio:** 1:1, square
- **Size:** 1200 × 1200 px
- **Download:** PNG

```text
Create a photorealistic photograph. Format: PNG. Orientation: square. Aspect ratio: 1:1. Size: 1200 × 1200 pixels. If you cannot output that exact size, use the largest square size you can.

Scene: a low view under the front of a brand-new car parked on a concrete stockyard floor in daylight. A hand in a thin black nitrile glove holds a small black torch, and its beam lights the underside: a dark grey plastic underbody shield with a fresh pale scrape mark across it, then clean new suspension parts and a clean exhaust pipe further back. The rest of the underside is in soft shadow, with bright daylight at the edges of the frame around the car.

Composition: camera almost on the ground, 35 mm lens at f/4, the scrape in the torch beam in sharp focus.

Look: editorial photography, cool neutral white balance (about 5200 K), slightly desaturated, deep clean blacks, crisp highlights, fine natural grain.

Do not include: any text, letters, numbers, watermarks, logos or brand marks (on parts, the torch, the glove or anywhere); rust or oil leaks (the car is new); distorted fingers; a CGI, 3D render or illustration look; lens flare.
```
