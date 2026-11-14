# New-product technical article commissioning plan

Status: all 20 articles written and integrated into the News build on 2026-11-14.
Source: `scripts/component-articles.js`; routes: `/news/{slug}/`.
Every article has six unique technical sections, an illustrative application
scenario, a review table, two visible FAQ answers and matching schema, product
links and primary reference links. Three gangway articles include supplied
partner application photographs. All 20 have distinct bodies, slugs and metadata.

Each article requires an original technical argument, an explicitly hypothetical
application scenario, a procurement or inspection table, product/internal links,
matched FAQ, and authoritative references verified before publication. Do not
reuse a generic body with different product names. Do not publish unverified
test thresholds, approval claims, replacement instructions or customer cases.

| No. | Working English title | Technical focus | Application scenario |
| --- | --- | --- | --- |
| 1 | Railway Coil Spring Selection: Why Free Height Is Not Enough | Load-deflection points, installed height, seats, drawing tolerances | Freight wagon suspension renewal |
| 2 | Matched Bogie Spring Groups: Controlling Configuration and Traceability | Inner/outer sets, position identification, acceptance records | Depot ordering complete spring groups |
| 3 | Railway Spring Inspection: Separating Qualification from Batch Acceptance | Material identity, dimensions, functional measurements, fatigue evidence | First supply versus repeat delivery |
| 4 | Railway Bearing Adapters: Managing the Bearing-to-Side-Frame Interface | Seating profiles, datums, bearing designation, locating geometry | Bearing replacement procurement |
| 5 | Bearing Adapter and Shear Pad Supply: Defining the Assembly Boundary | Metal interface versus elastomer specification, separate approval | Bogie refurbishment package |
| 6 | Friction Wedges and Bolster Pockets: Why Mating Geometry Matters | Inclined contact, wear surfaces, system compatibility | Freight bogie maintenance sourcing |
| 7 | Friction Wedge Inspection: What a Dimensional Report Cannot Prove | Component acceptance versus suspension validation | Alternate-supplier assessment |
| 8 | Railway Brake Hose Coupling Heads: Defining a Complete Replacement Assembly | Palm coupling, seals, hose length datums, end orientation | Inter-vehicle pneumatic connection renewal |
| 9 | Railway Hose Routing: Translating Vehicle Movement into an RFQ | Movement envelope, clearance, support and abrasion review | Bogie-to-body pneumatic routing |
| 10 | Railway Brake Shoes: Matching Material, Backplate and Brake Rigging | Friction-material definition, mounting features, fit | Fleet brake-shoe purchasing |
| 11 | Brake Shoe Acceptance Records: Connecting the Part to Its Approved Specification | Marking, batch identity, inspection documents, configuration | Incoming inspection at a maintenance depot |
| 12 | Railway Knuckle Couplers: Specify the System, Not Just the Head | Coupler family, interfaces, knuckle, pins and associated scope | Freight-car replacement inquiry |
| 13 | Coupler and Draft Gear Interfaces: Building a Clear Supply Responsibility Matrix | Yoke, follower, pocket, travel and qualification boundaries | Vehicle overhaul tender |
| 14 | Traction Motor Carbon Brushes: Why Dimensions Alone Do Not Establish Compatibility | Approved grade, holder fit, lead and terminal, motor identity | Locomotive motor overhaul |
| 15 | Carbon Brush Procurement: Avoiding Confusion Between Brush, Holder and Assembly | Scope, controlled drawing, traceability, storage | Spare-parts inventory renewal |
| 16 | Railway Gangway Movement Envelopes: From Car-End Geometry to Supplier Review | Combined movement, passage clearance, mounting interfaces | Metro inter-car connection design review |
| 17 | Gangway Bellows Replacement: Separating Envelope, Frames and Floor Bridge | Fold geometry, compressed length, attachments, materials | Passenger-coach refurbishment |
| 18 | Inter-Car Passage Interiors: Coordinating Side Panels, Handrails and Floor Plates | Interface-control drawing, clearance, accessible passage | Interior modernization; supplied PDF photos |
| 19 | Articulated Bus Bellows: Why a Railway Gangway Is Not an Equivalent Replacement | Steering articulation, body contours, attachment profiles | City-bus bellows replacement |
| 20 | Passenger Boarding Bridge Canopies: Define Replacement Scope Before Quoting | Existing bridge identity, aircraft-contact interface, canopy versus complete bridge | Airport boarding-bridge canopy refurbishment |

## Image Plan

Articles 16–18 can use the supplied brochure application photographs in
`assets/gangway-applications/`. Label them partner application references, not
Railwheel-owned facilities or confirmed deliveries. Do not use those images as
bus or airport installation evidence.

Other articles can use the existing clearly disclosed product illustrations.
For interface explanations, prepare original conceptual diagrams clearly marked
not to scale, rather than inventing production dimensions or test certificates.

## Primary Research Starting Points

- Wabtec truck-system product categories and associated technical manuals:
  https://www.wabteccorp.com/freight-car/truck-systems
- Wabtec springs:
  https://www.wabteccorp.com/freight-car/truck-systems/springs
- Wabtec friction wedges:
  https://www.wabteccorp.com/freight-car/truck-systems/friction-wedges
- Amsted Rail end-of-car product categories:
  https://www.amstedrail.com/products/freight-car-components/draft-sills-and-draft-gear/
- Dellner connection-system categories:
  https://www.dellner.com/products
- TK Elevator boarding-bridge categories:
  https://airportsolutions.tkelevator.com/global-en/products/passenger-boarding-bridges/

Primary sources were reviewed during drafting. Article-specific links are stored
in `componentArticleSources` in the source module. The published text separates
source context from project acceptance criteria; competitor approvals and
performance values are not presented as Railwheel capabilities. Obtain controlled
standards and the applicable editions for an actual engineering project.
