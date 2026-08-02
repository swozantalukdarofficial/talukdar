# evsolutionbd.com — Meta Titles & Clean Slugs

144 products. 79 slugs corrected, 65 unchanged. All titles 45–60 characters, all unique.

## How to implement

**1. Fix the title template first.** The product page currently appends `| EV Solution BD` to whatever title it is given, which is why titles like `About Us | EV Solution BD - Leading Smart EV & Solar Platform | EV Solution BD` appear on the site. The titles below are complete standalone titles. In your product-page metadata, set the template to `%s` (or remove the parent `title.template` inheritance for product routes) so nothing is appended.

**2. Deploy the 301 redirects before or at the same time as the slug change.** 79 product URLs change. Without redirects those pages return 404, you lose their existing rankings and any inbound links break. Use `redirects.next.config.js` (drop-in) or `redirects-301.csv` (for a CDN/Cloudflare rule). Keep the redirects permanently — do not remove them after a few months.

**3. Run the SQL.** `update-titles-slugs.sql` updates meta title, product name and slug in one transaction, keyed on the old slug. It also fixes the typos in product names (ELECTRINICS, BUSS, DIFFERENCIAL, Orinal, Rikshaw, Elezabeth, REMOT CONTROLL and others), which currently show up in the H1, the breadcrumb and the Product schema.

**4. Resubmit the sitemap** in Google Search Console after deploying, and watch the Coverage report for the redirected URLs.

## Title rules used

- 45–60 characters, so Google does not truncate them in the SERP
- Product name first — that is what people search
- "Price in Bangladesh" / "Price in BD" on most titles, because that is the dominant query pattern in this market
- No brand suffix (the template adds it — see step 1)
- Voltage, Ah, kW and wattage kept on batteries, inverters and panels, since those are the actual search terms
- No invented specs. Nothing about motors, range or speed on solar and battery products

## Things to fix in your data

- **Two LVTOPSUN 51.2V 100Ah 5.12kWh batteries at ৳80,000 and ৳44,500.** Same capacity, very different price. The expensive one has a colour touchscreen and floor/wall stand, the cheaper one is rack/wall mounted with WiFi — I used those to differentiate the titles and slugs, but check whether the price gap is intentional.
- **LVTOPSUN 6kW inverter at ৳17,500 vs the 4kW at ৳45,450.** Almost certainly a data entry error.
- **Negative discounts:** Akij Electric Scooter shows ৳350,000 now vs ৳330,000 before ("-6% OFF"), and Songi ৳400,000 vs ৳390,000.
- **E-bike copy on solar products.** The SOSEN inverter page claims a "500W brushless motor", "70-90 km per charge" and "40 km/h top speed". That template text has been copied across solar and battery pages. It is wrong and it hurts trust — worth a pass through those descriptions.

## Renamed slugs

| Old URL | New URL |
| --- | --- |
| `/products/ae-solar-550w-ae-md-144-series` | `/products/ae-solar-550w-md-144-series` |
| `/products/akaiyai-stackflex-dynamic-a51r100-p-5-12kwh-51-2v-modular-lithium-battery` | `/products/akaiyai-stackflex-a51r100-p-5-12kwh-51-2v-modular-battery` |
| `/products/akij-durjoy-price` | `/products/akij-durjoy` |
| `/products/antique-car-elezabeth` | `/products/akij-elizabeth-antique-car` |
| `/products/bondhu` | `/products/akij-bondhu` |
| `/products/cargo-vansandi-electrinics-tricycleco` | `/products/sandi-electronics-cargo-van-tricycle` |
| `/products/city-e-cab-pothik` | `/products/akij-city-e-cab-pothik` |
| `/products/crown-micro-arceus-65kw-48v-pv-7800w-mppt-solar-inverter` | `/products/crown-micro-arceus-6-5kw-48v-mppt-solar-inverter` |
| `/products/delivery-van` | `/products/akij-delivery-van` |
| `/products/delivery-vanpg` | `/products/electric-delivery-van-pg` |
| `/products/differencial-42-inch-with-motor-controller-full-set` | `/products/differential-42-inch-motor-controller-full-set` |
| `/products/djdc-24v-100ah-lifepo4-battery-2-56kwh-wall-mounted-high-capacity-solar-energy-storage` | `/products/djdc-24v-100ah-2-56kwh-wall-mounted-lifepo4-battery` |
| `/products/djdc-24v100ah-ips-lifepo4-battery` | `/products/djdc-24v-100ah-ips-lifepo4-battery` |
| `/products/djdc-48v100ah-wall-mounted-lifepo4-battery` | `/products/djdc-48v-100ah-wall-mounted-lifepo4-battery` |
| `/products/djdc-48v200ah-wall-mounted-lifepo4-battery` | `/products/djdc-48v-200ah-wall-mounted-lifepo4-battery` |
| `/products/dorian` | `/products/akij-dorian` |
| `/products/durbar` | `/products/akij-durbar` |
| `/products/durdanto-v6` | `/products/akij-durdanto-v6` |
| `/products/durjoy` | `/products/akij-durjoy-150kg` |
| `/products/duronto` | `/products/akij-duronto` |
| `/products/electric-cargo-loaderheavy` | `/products/electric-cargo-loader-heavy-duty` |
| `/products/electric-cargo-van` | `/products/electric-cargo-van-100-200km` |
| `/products/electric-mini-school-buss` | `/products/electric-mini-school-bus` |
| `/products/electric-mini-school-buss-open` | `/products/electric-mini-school-bus-open` |
| `/products/electric-pick-up` | `/products/akij-electric-pick-up` |
| `/products/electric-rikshaw-pigeon` | `/products/akij-electric-rickshaw-pigeon` |
| `/products/electric-scooter` | `/products/akij-electric-scooter` |
| `/products/electric-vehicle-songi` | `/products/akij-songi-electric-vehicle` |
| `/products/eve-motors-eve-smart-scooter` | `/products/eve-motors-smart-scooter` |
| `/products/ez-go-ez-go-family` | `/products/ez-go-family` |
| `/products/ez-go-ez-go-hunter` | `/products/ez-go-hunter` |
| `/products/ez-go-ez-go-venturer` | `/products/ez-go-venturer` |
| `/products/food-cart` | `/products/electric-food-cart` |
| `/products/genixgreen-es-box12-lcd-51-2v-100ah-5-12kw-lifepo4-battery` | `/products/genixgreen-es-box12-51-2v-100ah-5-12kwh-lifepo4-battery` |
| `/products/genixgreen-es-box12-plus-lcd-51-2v-200ah-10-24kw-lifepo4-battery` | `/products/genixgreen-es-box12-plus-51-2v-200ah-10-24kwh-lifepo4-battery` |
| `/products/growatt-spf-3500-es-35kw-48v-off-grid-hybrid-solar-inverter` | `/products/growatt-spf-3500-es-3-5kw-48v-off-grid-hybrid-inverter` |
| `/products/hithium-heroee-neopower-4-12-8v-314ah-4kwh-lifepo-lithium-battery` | `/products/hithium-heroee-neopower-4-12-8v-314ah-4kwh-lifepo4-battery` |
| `/products/ja-solar-deep-blue-40-pro-615w-bifacial-solar-panel` | `/products/ja-solar-deep-blue-4-0-pro-615w-bifacial-solar-panel` |
| `/products/ja-solar-deep-blue-40-pro-620w-bifacial-solar-panel` | `/products/ja-solar-deep-blue-4-0-pro-620w-bifacial-solar-panel` |
| `/products/jinko-615w-n-type-bifacial-solar-panel-official` | `/products/jinko-615w-n-type-bifacial-solar-panel` |
| `/products/lithium-ion-battery-cellgotion` | `/products/gotion-3-2v-105ah-lithium-ion-battery-cell` |
| `/products/lvtopsun-12-8v-280ah-3-58kwh-lithium-iron-phosphate-battery` | `/products/lvtopsun-12-8v-280ah-3-58kwh-lifepo4-battery` |
| `/products/lvtopsun-25-6v-100ah-2-56-kwh-lithium-iron-phosphate-battery` | `/products/lvtopsun-25-6v-100ah-2-56kwh-lifepo4-battery-metal-case` |
| `/products/lvtopsun-25-6v-100ah-2-56-kwh-lithium-iron-phosphate-battery-abs-case` | `/products/lvtopsun-25-6v-100ah-2-56kwh-lifepo4-battery-abs-case` |
| `/products/lvtopsun-25-6v-200ah-5-12kwh-lithium-iron-phosphate-battery` | `/products/lvtopsun-25-6v-200ah-5-12kwh-lifepo4-battery` |
| `/products/lvtopsun-51-2v-100ah-5-12kwh-lithium-iron-phosphate-battery` | `/products/lvtopsun-51-2v-100ah-5-12kwh-lifepo4-battery-rack-mount` |
| `/products/lvtopsun-51-2v-100ah-5-12kwh-lithium-iron-phosphate-battery-26` | `/products/lvtopsun-51-2v-100ah-5-12kwh-lifepo4-battery-touchscreen` |
| `/products/lvtopsun-51-2v-200ah-10-24kwh-lithium-iron-phosphate-battery` | `/products/lvtopsun-51-2v-200ah-10-24kwh-lifepo4-battery` |
| `/products/lvtopsun-g3-51-2v-314a-16-kwh-lifepo-solar-energy-storage-battery` | `/products/lvtopsun-g3-51-2v-314ah-16kwh-lifepo4-storage-battery` |
| `/products/mili-litag-duo-smart-finder-location-tracking-device-android-ios` | `/products/mili-litag-duo-smart-finder-tracker` |
| `/products/mini-cargo-van` | `/products/akij-mini-cargo-van` |
| `/products/motor-controller-square-3000w4860` | `/products/square-motor-controller-3000w-48v-60v` |
| `/products/nasir-syntax-motors-syntax-avento` | `/products/nasir-syntax-avento` |
| `/products/nasir-syntax-motors-syntax-gen-z` | `/products/nasir-syntax-gen-z` |
| `/products/nasir-syntax-motors-syntax-lima` | `/products/nasir-syntax-lima` |
| `/products/nasir-syntax-motors-syntax-rayo` | `/products/nasir-syntax-rayo` |
| `/products/ponkhiraj` | `/products/akij-ponkhiraj` |
| `/products/recreationsightseeing-car` | `/products/akij-recreation-sightseeing-car` |
| `/products/sako-12v-100ah-lifepo-lithium-battery` | `/products/sako-12v-100ah-lifepo4-battery` |
| `/products/sako-e-sun-12kva-12v-off-grid-hybrid-inverter` | `/products/sako-e-sun-1-2kva-12v-off-grid-hybrid-inverter` |
| `/products/sako-e-sun-42kva-24v-off-grid-hybrid-inverter` | `/products/sako-e-sun-4-2kva-24v-off-grid-hybrid-inverter` |
| `/products/sako-sunon-v-45k-24v-off-grid-hybrid-inverter` | `/products/sako-sunon-v-4-5k-24v-off-grid-hybrid-inverter` |
| `/products/sandi-borak-back-show` | `/products/sandi-borak-rear-body-shell` |
| `/products/sandi-borak-show` | `/products/sandi-borak-body-shell` |
| `/products/sandi-mini-folding-seat` | `/products/sandi-mini-folding-seat-tricycle` |
| `/products/sightseeing-bus` | `/products/akij-sightseeing-bus` |
| `/products/solar-e-rickshaw` | `/products/akij-solar-e-rickshaw` |
| `/products/solis-12kw-single-phase-hybrid-inverter-s6-eh1p12k03-nv-yd-l` | `/products/solis-12kw-single-phase-hybrid-inverter-s6-eh1p12k03` |
| `/products/solis-16kw-single-phase-hybrid-inverter-s6-eh1p16k03-nv-yd-l` | `/products/solis-16kw-single-phase-hybrid-inverter-s6-eh1p16k03` |
| `/products/solis-s6-eo1p-5k-48-5kw-single-phase-off-grid-hybrid-inverter` | `/products/solis-s6-eo1p-5k-48-5kw-off-grid-hybrid-inverter` |
| `/products/solis-s6-eo1p-6k-48-6kw-single-phase-off-grid-hybrid-inverter` | `/products/solis-s6-eo1p-6k-48-6kw-off-grid-hybrid-inverter` |
| `/products/sosen-55kw-48v-solar-off-grid-hybrid-inverter` | `/products/sosen-5-5kw-48v-solar-off-grid-hybrid-inverter` |
| `/products/star-dowedo` | `/products/star-dowedo-electric-tricycle` |
| `/products/titan-goldenblue` | `/products/titan-golden-blue` |
| `/products/vehicle-tracking-smart-car-black-box-dash-camera-pro-jc200` | `/products/jc200-smart-dash-camera-gps-tracker` |
| `/products/walton-takyon-1-00` | `/products/walton-takyon-100` |
| `/products/walton-takyon-fusion-25t1` | `/products/walton-takyon-leo-25t1` |
| `/products/yadea-e8s200` | `/products/yadea-e8s-200` |
| `/products/yundi-orinal-china` | `/products/yundi-original-china` |

## E-Bike / Scooter (69)

| Product | Meta title | Chars | Slug |
| --- | --- | --- | --- |
| Aima F520 | Aima F520 - Electric Scooter Price in Bangladesh | 48 | `aima-f520` |
| Aima F626 | Aima F626 - Electric Scooter Price in Bangladesh | 48 | `aima-f626` |
| Akij Bondhu | Akij Bondhu - 600 W Motor Price in Bangladesh | 45 | `akij-bondhu` |
| Akij Dorian | Akij Dorian - 2000 Watt Motor Price in Bangladesh | 49 | `akij-dorian` |
| Akij Durbar | Akij Durbar - 2500 W Motor Price in Bangladesh | 46 | `akij-durbar` |
| Akij Durdanto V6 | Akij Durdanto V6 - 3000 W Motor Price in Bangladesh | 51 | `akij-durdanto-v6` |
| Akij Durjoy | Akij Durjoy - Electric Scooter Price in Bangladesh | 50 | `akij-durjoy` |
| Akij Durjoy 150kg | Akij Durjoy 150kg - 1000 W Motor Price in Bangladesh | 52 | `akij-durjoy-150kg` |
| Akij Duronto | Akij Duronto - 1200 W Motor Price in Bangladesh | 47 | `akij-duronto` |
| Akij Electric Scooter | Akij Electric Scooter - 50-200 KM Range Price in Bangladesh | 59 | `akij-electric-scooter` |
| Akij Ponkhiraj | Akij Ponkhiraj - 1000 W Motor Price in Bangladesh | 49 | `akij-ponkhiraj` |
| Akij Ponkhiraj 48V | Akij Ponkhiraj 48V - Electric Bike Price in Bangladesh | 54 | `akij-ponkhiraj-48v` |
| Akij Sathi 60V | Akij Sathi 60V Electric Bike Price in Bangladesh | 48 | `akij-sathi-60v` |
| Atom 3-Wheel Electric Passenger Tricycle | Atom 3-Wheel Electric Passenger Tricycle Price in BD | 52 | `atom-3-wheel-electric-passenger-tricycle` |
| EZ-GO Family | EZ-GO Family Electric Scooter Price in Bangladesh | 49 | `ez-go-family` |
| EZ-GO Hunter | EZ-GO Hunter - Electric Scooter Price in Bangladesh | 51 | `ez-go-hunter` |
| EZ-GO Venturer | EZ-GO Venturer - Electric Scooter Price in Bangladesh | 53 | `ez-go-venturer` |
| Electric Cargo Loader (Heavy Duty) | Electric Cargo Loader Heavy Duty Price in Bangladesh | 52 | `electric-cargo-loader-heavy-duty` |
| Electric Cargo Van (100-200km) | Electric Cargo Van 100-200km Price in Bangladesh | 48 | `electric-cargo-van-100-200km` |
| Electric Cycle | Electric Cycle - 40 km Range Price in Bangladesh | 48 | `electric-cycle` |
| Electric Delivery Van (PG) | Electric Delivery Van PG Model Price in Bangladesh | 50 | `electric-delivery-van-pg` |
| Electric Food Cart | Electric Food Cart for Business Price in Bangladesh | 51 | `electric-food-cart` |
| Electric Mini Covered Van (TMI) | Electric Mini Covered Van TMI Price in Bangladesh | 49 | `electric-mini-covered-van-tmi` |
| Electric Mini Delivery Van 6 Feet | Electric Mini Delivery Van 6 Feet Price in Bangladesh | 53 | `electric-mini-delivery-van-6-feet` |
| Electric Mini School Bus | Electric Mini School Bus 100-250km Price in Bangladesh | 54 | `electric-mini-school-bus` |
| Electric Mini School Bus (Open) | Electric Mini School Bus Open Price in Bangladesh | 49 | `electric-mini-school-bus-open` |
| Electric Scooty Cycle | Electric Scooty Cycle for Girls Price in Bangladesh | 51 | `electric-scooty-cycle` |
| Eve Motors Smart Scooter | Eve Motors Smart Scooter Price in Bangladesh - 60V | 50 | `eve-motors-smart-scooter` |
| Exploit 3043 Plus | Exploit 3043 Plus - Electric Scooter Price in Bangladesh | 56 | `exploit-3043-plus` |
| Falcon DX1200 DT | Falcon DX1200 DT - Electric Scooter Price in Bangladesh | 55 | `falcon-dx1200-dt` |
| Green Tiger GT Fenix XR | Green Tiger GT Fenix XR - Electric Bike Price in Bangladesh | 59 | `green-tiger-gt-fenix-xr` |
| Green Tiger JR Vive | Green Tiger JR Vive - Electric Scooter Price in Bangladesh | 58 | `green-tiger-jr-vive` |
| Nasir Syntax Avento | Nasir Syntax Avento - Electric Scooter Price in Bangladesh | 58 | `nasir-syntax-avento` |
| Nasir Syntax Gen Z | Nasir Syntax Gen Z - Electric Scooter Price in Bangladesh | 57 | `nasir-syntax-gen-z` |
| Nasir Syntax Lima | Nasir Syntax Lima - Electric Scooter Price in Bangladesh | 56 | `nasir-syntax-lima` |
| Nasir Syntax Rayo | Nasir Syntax Rayo - Electric Scooter Price in Bangladesh | 56 | `nasir-syntax-rayo` |
| Revoo A01 | Revoo A01 - Electric Scooter Price in Bangladesh | 48 | `revoo-a01` |
| Revoo A11 | Revoo A11 - Electric Scooter Price in Bangladesh | 48 | `revoo-a11` |
| Revoo A12 | Revoo A12 - Electric Scooter Price in Bangladesh | 48 | `revoo-a12` |
| Revoo C00 | Revoo C00 - Electric Scooter Price in Bangladesh | 48 | `revoo-c00` |
| Revoo C03 | Revoo C03 - Electric Scooter Price in Bangladesh | 48 | `revoo-c03` |
| Revoo C32 | Revoo C32 - Electric Scooter Price in Bangladesh | 48 | `revoo-c32` |
| Revoo E52 | Revoo E52 - Electric Scooter Price in Bangladesh | 48 | `revoo-e52` |
| Revoo Falcon XN3000 | Revoo Falcon XN3000 - Electric Scooter Price in Bangladesh | 58 | `revoo-falcon-xn3000` |
| Rydo Blaze White | Rydo Blaze White - Electric Scooter Price in Bangladesh | 55 | `rydo-blaze-white` |
| Sandi Borak (China) | Sandi Borak China Electric Tricycle Price in Bangladesh | 55 | `sandi-borak-china` |
| Sandi Borak Folding Seat (Original China) | Sandi Borak Folding Seat Original China Price in BD | 51 | `sandi-borak-folding-seat-original-china` |
| Sandi Electronics Cargo Van Tricycle | Sandi Electronics Cargo Van Price in Bangladesh | 47 | `sandi-electronics-cargo-van-tricycle` |
| Sandi Mini Folding Seat Tricycle | Sandi Mini Folding Seat Tricycle Price in Bangladesh | 52 | `sandi-mini-folding-seat-tricycle` |
| Star Dowedo Electric Tricycle | Star Dowedo Electric Tricycle Price in Bangladesh | 49 | `star-dowedo-electric-tricycle` |
| Tailg F72 Leopard | Tailg F72 Leopard - Electric Scooter Price in Bangladesh | 56 | `tailg-f72-leopard` |
| Tailg Phoenix F73 | Tailg Phoenix F73 - Electric Scooter Price in Bangladesh | 56 | `tailg-phoenix-f73` |
| Tailg Saibei F71 | Tailg Saibei F71 - Electric Scooter Price in Bangladesh | 55 | `tailg-saibei-f71` |
| Titan Crown / Star | Titan Crown/Star 80-200km Range Price in Bangladesh | 51 | `titan-crown-star` |
| Titan Golden / Blue | Titan Golden/Blue Electric Bike Price in Bangladesh | 51 | `titan-golden-blue` |
| Walton Takyon | Walton Takyon - Electric Scooter Price in Bangladesh | 52 | `walton-takyon` |
| Walton Takyon 100 | Walton Takyon 100 - Electric Scooter Price in Bangladesh | 56 | `walton-takyon-100` |
| Walton Takyon Fusion 25FZ | Walton Takyon Fusion 25FZ Price in Bangladesh | 45 | `walton-takyon-fusion-25fz` |
| Walton Takyon Leo | Walton Takyon Leo - Electric Scooter Price in Bangladesh | 56 | `walton-takyon-leo` |
| Walton Takyon Leo 25T1 | Walton Takyon Leo 25T1 - Electric Bike Price in Bangladesh | 58 | `walton-takyon-leo-25t1` |
| Yadea E8S 200 | Yadea E8S 200 Electric Scooter Price in Bangladesh | 50 | `yadea-e8s-200` |
| Yadea E8S Pro | Yadea E8S Pro - Electric Scooter Price in Bangladesh | 52 | `yadea-e8s-pro` |
| Yadea G150P | Yadea G150P - Electric Scooter Price in Bangladesh | 50 | `yadea-g150p` |
| Yadea GT60 | Yadea GT60 - Electric Scooter Price in Bangladesh | 49 | `yadea-gt60` |
| Yadea M6 | Yadea M6 - Electric Scooter Price in Bangladesh | 47 | `yadea-m6` |
| Yadea T5 | Yadea T5 - Electric Scooter Price in Bangladesh | 47 | `yadea-t5` |
| Yadea Velax | Yadea Velax - Electric Scooter Price in Bangladesh | 50 | `yadea-velax` |
| Yundi Original (China) | Yundi Original China Electric Bike Price in Bangladesh | 54 | `yundi-original-china` |
| Zeeho AE8 SE | Zeeho AE8 SE - 45-50 km Range Price in Bangladesh | 49 | `zeeho-ae8-se` |

## Commercial EV (10)

| Product | Meta title | Chars | Slug |
| --- | --- | --- | --- |
| Akij City E-Cab Pothik | Akij City E-Cab Pothik - 100 KM Range Price in Bangladesh | 57 | `akij-city-e-cab-pothik` |
| Akij Delivery Van | Akij Delivery Van - 40-200 KM Range Price in Bangladesh | 55 | `akij-delivery-van` |
| Akij Electric Pick-Up | Akij Electric Pick-Up - Commercial EV Price in Bangladesh | 57 | `akij-electric-pick-up` |
| Akij Electric Rickshaw Pigeon | Akij Electric Rickshaw Pigeon Price in Bangladesh | 49 | `akij-electric-rickshaw-pigeon` |
| Akij Elizabeth Antique Car | Akij Elizabeth Antique Car Price in Bangladesh | 46 | `akij-elizabeth-antique-car` |
| Akij Mini Cargo Van | Akij Mini Cargo Van - 40-200 KM Range Price in Bangladesh | 57 | `akij-mini-cargo-van` |
| Akij Recreation & Sightseeing Car | Akij Recreation & Sightseeing Car Price in Bangladesh | 53 | `akij-recreation-sightseeing-car` |
| Akij Sightseeing Bus | Akij Sightseeing Bus - 100 KM Range Price in Bangladesh | 55 | `akij-sightseeing-bus` |
| Akij Solar E-Rickshaw | Akij Solar E-Rickshaw - 800 Watt Motor Price in Bangladesh | 58 | `akij-solar-e-rickshaw` |
| Akij Songi Electric Vehicle | Akij Songi Electric Vehicle Price in Bangladesh | 47 | `akij-songi-electric-vehicle` |

## Battery (27)

| Product | Meta title | Chars | Slug |
| --- | --- | --- | --- |
| AKAIYAI StackFlex Dynamic A51r100-P 5.12kWh 51.2V Modular Lithium Battery | AKAIYAI StackFlex Dynamic A51r100-P 5.12kWh Price in BD | 55 | `akaiyai-stackflex-a51r100-p-5-12kwh-51-2v-modular-battery` |
| Crown 12.8V 100Ah Lithium Battery | Crown 12.8V 100Ah Lithium Battery Price in Bangladesh | 53 | `crown-12-8v-100ah-lithium-battery` |
| Crown 12.8V 200Ah Lithium Battery | Crown 12.8V 200Ah Lithium Battery Price in Bangladesh | 53 | `crown-12-8v-200ah-lithium-battery` |
| Crown 25.6V 100Ah Lithium LiFePO4 Battery | Crown 25.6V 100Ah LiFePO4 Battery Price in Bangladesh | 53 | `crown-25-6v-100ah-lithium-lifepo4-battery` |
| DJDC 24V 100Ah IPS LiFePO4 Battery | DJDC 24V 100Ah IPS LiFePO4 Battery Price in Bangladesh | 54 | `djdc-24v-100ah-ips-lifepo4-battery` |
| DJDC 24V 100Ah LiFePO4 Battery - 2.56kWh Wall-Mounted High-Capacity Solar Energy Storage | DJDC 24V 100Ah LiFePO4 Battery 2.56kWh Price in BD | 50 | `djdc-24v-100ah-2-56kwh-wall-mounted-lifepo4-battery` |
| DJDC 48V 100Ah Wall-Mounted LiFePO4 Battery | DJDC 48V 100Ah Wall-Mounted LiFePO4 Battery Price in BD | 55 | `djdc-48v-100ah-wall-mounted-lifepo4-battery` |
| DJDC 48V 200Ah Wall-Mounted LiFePO4 Battery | DJDC 48V 200Ah Wall-Mounted LiFePO4 Battery Price in BD | 55 | `djdc-48v-200ah-wall-mounted-lifepo4-battery` |
| GENIXGREEN 51.2V 100A 5.12kWh LiFePO4 Battery | GENIXGREEN 51.2V 100A 5.12kWh LiFePO4 Battery Price in BD | 57 | `genixgreen-51-2v-100a-5-12kwh-lifepo4-battery` |
| GENIXGREEN ES-BOX12 LCD 51.2V 100Ah 5.12kWh LiFePO4 Battery | GENIXGREEN ES-BOX12 51.2V 100Ah LiFePO4 Price in Bangladesh | 59 | `genixgreen-es-box12-51-2v-100ah-5-12kwh-lifepo4-battery` |
| GENIXGREEN ES-BOX12 Plus LCD 51.2V 200Ah 10.24kWh LiFePO4 Battery | GENIXGREEN ES-BOX12 Plus 51.2V 200Ah 10.24kWh Price in BD | 57 | `genixgreen-es-box12-plus-51-2v-200ah-10-24kwh-lifepo4-battery` |
| Gotion Lithium-Ion Battery Cell 3.2V 105Ah | Gotion Lithium-Ion Battery Cell 3.2V 105Ah Price in BD | 54 | `gotion-3-2v-105ah-lithium-ion-battery-cell` |
| HiTHIUM HeroEE 16 51.2V 16kWh LiFePO4 Battery | HiTHIUM HeroEE 16 51.2V 16kWh LiFePO4 Battery Price in BD | 57 | `hithium-heroee-16-51-2v-16kwh-lifepo4-battery` |
| HiTHIUM HeroEE NeoPower 4 12.8V 314Ah 4kWh LiFePO4 Lithium Battery | HiTHIUM HeroEE NeoPower 12.8V 314Ah 4kWh Price in BD | 52 | `hithium-heroee-neopower-4-12-8v-314ah-4kwh-lifepo4-battery` |
| LVTOPSUN 12.8V 280Ah 3.58kWh Lithium Iron Phosphate Battery | LVTOPSUN 12.8V 280Ah 3.58kWh LiFePO4 Battery Price in BD | 56 | `lvtopsun-12-8v-280ah-3-58kwh-lifepo4-battery` |
| LVTOPSUN 25.6V 100Ah 2.56 kWh Lithium Iron Phosphate Battery (ABS Case) | LVTOPSUN 25.6V 100Ah 2.56kWh LiFePO4 Battery Price in BD | 56 | `lvtopsun-25-6v-100ah-2-56kwh-lifepo4-battery-abs-case` |
| LVTOPSUN 25.6V 100Ah 2.56kWh LiFePO4 Battery (Metal Case) | LVTOPSUN 25.6V 100Ah 2.56kWh LiFePO4 Metal Case Battery | 55 | `lvtopsun-25-6v-100ah-2-56kwh-lifepo4-battery-metal-case` |
| LVTOPSUN 25.6V 200Ah 5.12kWh Lithium Iron Phosphate Battery | LVTOPSUN 25.6V 200Ah 5.12kWh LiFePO4 Battery Price in BD | 56 | `lvtopsun-25-6v-200ah-5-12kwh-lifepo4-battery` |
| LVTOPSUN 25.6V 200Ah Lithium LiFePO4 Battery | LVTOPSUN 25.6V 200Ah LiFePO4 Battery Price in Bangladesh | 56 | `lvtopsun-25-6v-200ah-lithium-lifepo4-battery` |
| LVTOPSUN 51.2V 100Ah 5.12kWh LiFePO4 Battery (Rack Mount, WiFi) | LVTOPSUN 51.2V 100Ah 5.12kWh LiFePO4 Rack Mount Battery | 55 | `lvtopsun-51-2v-100ah-5-12kwh-lifepo4-battery-rack-mount` |
| LVTOPSUN 51.2V 100Ah 5.12kWh LiFePO4 Battery (Touchscreen, Floor/Wall) | LVTOPSUN 51.2V 100Ah 5.12kWh LiFePO4 Touchscreen Battery | 56 | `lvtopsun-51-2v-100ah-5-12kwh-lifepo4-battery-touchscreen` |
| LVTOPSUN 51.2V 200Ah 10.24kWh Lithium Iron Phosphate Battery | LVTOPSUN 51.2V 200Ah 10.24kWh LiFePO4 Battery Price in BD | 57 | `lvtopsun-51-2v-200ah-10-24kwh-lifepo4-battery` |
| LVTOPSUN G3 51.2V 314A 16 kWh LiFePO4 Solar Energy Storage Battery | LVTOPSUN G3 51.2V 314A 16kWh LiFePO4 Storage Price in BD | 56 | `lvtopsun-g3-51-2v-314ah-16kwh-lifepo4-storage-battery` |
| LVTOPSUN LVTS-512100-G3A 51.2V 100Ah 5.12kWh LiFePO4 Battery | LVTOPSUN LVTS-512100-G3A 51.2V 100Ah LiFePO4 Price in BD | 56 | `lvtopsun-lvts-512100-g3a-51-2v-100ah-5-12kwh-lifepo4-battery` |
| LVTOPSUN LVTS-512314-G3A 51.2V 314Ah 16kWh LiFePO4 Battery | LVTOPSUN LVTS-512314-G3A 51.2V 314Ah LiFePO4 Price in BD | 56 | `lvtopsun-lvts-512314-g3a-51-2v-314ah-16kwh-lifepo4-battery` |
| Luxwatt 12.8V 200Ah 2.56kWh LiFePO4 Battery | Luxwatt 12.8V 200Ah 2.56kWh LiFePO4 Battery Price in BD | 55 | `luxwatt-12-8v-200ah-2-56kwh-lifepo4-battery` |
| SAKO 12V 100Ah LiFePO4 Lithium Battery | SAKO 12V 100Ah LiFePO4 Lithium Battery Price in Bangladesh | 58 | `sako-12v-100ah-lifepo4-battery` |

## Solar (29)

| Product | Meta title | Chars | Slug |
| --- | --- | --- | --- |
| AE Solar 550W MD-144 Series | AE Solar 550W MD-144 Series Price in Bangladesh | 47 | `ae-solar-550w-md-144-series` |
| Crown Micro ARCEUS 6.5kW 48V MPPT Solar Inverter | Crown Micro ARCEUS 6.5kW 48V MPPT Solar Inverter Price in BD | 60 | `crown-micro-arceus-6-5kw-48v-mppt-solar-inverter` |
| GoodWe 5kW Off-Grid Hybrid Inverter | GoodWe 5kW Off-Grid Hybrid Inverter Price in Bangladesh | 55 | `goodwe-5kw-off-grid-hybrid-inverter` |
| Growatt SPF 3500 ES 3.5kW 48V Off-Grid Hybrid Inverter | Growatt SPF 3500 3.5kW 48V Off-Grid Inverter Price in BD | 56 | `growatt-spf-3500-es-3-5kw-48v-off-grid-hybrid-inverter` |
| JA Solar Deep Blue 4.0 Pro 615W Bifacial Solar Panel | JA Solar Deep Blue 4.0 615W Bifacial Panel Price in BD | 54 | `ja-solar-deep-blue-4-0-pro-615w-bifacial-solar-panel` |
| JA Solar Deep Blue 4.0 Pro 620W Bifacial Solar Panel | JA Solar Deep Blue 4.0 620W Bifacial Panel Price in BD | 54 | `ja-solar-deep-blue-4-0-pro-620w-bifacial-solar-panel` |
| Jinko 615W N-Type Bifacial Solar Panel (Official) | Jinko 615W N-Type Bifacial Solar Panel Price in Bangladesh | 58 | `jinko-615w-n-type-bifacial-solar-panel` |
| LVTOPSUN 12kW 48V Solar Off-Grid Hybrid Inverter | LVTOPSUN 12kW 48V Solar Off-Grid Hybrid Inverter Price in BD | 60 | `lvtopsun-12kw-48v-solar-off-grid-hybrid-inverter` |
| LVTOPSUN 4kW 24V Solar Off-Grid Hybrid Inverter | LVTOPSUN 4kW 24V Solar Off-Grid Hybrid Inverter Price in BD | 59 | `lvtopsun-4kw-24v-solar-off-grid-hybrid-inverter` |
| LVTOPSUN 6kW 48V Solar Off-Grid Hybrid Inverter | LVTOPSUN 6kW 48V Solar Off-Grid Hybrid Inverter Price in BD | 59 | `lvtopsun-6kw-48v-solar-off-grid-hybrid-inverter` |
| REC Alpha Pro M 600W Heterojunction Mono Solar Panel | REC Alpha Pro M 600W HJT Mono Panel Price in Bangladesh | 55 | `rec-alpha-pro-m-600w-heterojunction-mono-solar-panel` |
| REC Alpha Pro M 610W Heterojunction Mono Solar Panel | REC Alpha Pro M 610W HJT Mono Panel Price in Bangladesh | 55 | `rec-alpha-pro-m-610w-heterojunction-mono-solar-panel` |
| SAKO E-SUN 1.2KVA 12V Off-Grid Hybrid Inverter | SAKO E-SUN 1.2KVA 12V Off-Grid Hybrid Inverter Price in BD | 58 | `sako-e-sun-1-2kva-12v-off-grid-hybrid-inverter` |
| SAKO E-SUN 2KVA 12V Off-Grid Hybrid Inverter | SAKO E-SUN 2KVA 12V Off-Grid Hybrid Inverter Price in BD | 56 | `sako-e-sun-2kva-12v-off-grid-hybrid-inverter` |
| SAKO E-SUN 3KVA 24V Off-Grid Hybrid Inverter | SAKO E-SUN 3KVA 24V Off-Grid Hybrid Inverter Price in BD | 56 | `sako-e-sun-3kva-24v-off-grid-hybrid-inverter` |
| SAKO E-SUN 4.2kVA 24V Off-Grid Hybrid Inverter | SAKO E-SUN 4.2kVA 24V Off-Grid Hybrid Inverter Price in BD | 58 | `sako-e-sun-4-2kva-24v-off-grid-hybrid-inverter` |
| SAKO Sunon V 4.5K 24V Off-Grid Hybrid Inverter | SAKO Sunon V 4.5K 24V Off-Grid Hybrid Inverter Price in BD | 58 | `sako-sunon-v-4-5k-24v-off-grid-hybrid-inverter` |
| SOSEN 5.5kW 48V Solar Off-Grid Hybrid Inverter | SOSEN 5.5kW 48V Solar Off-Grid Hybrid Inverter Price in BD | 58 | `sosen-5-5kw-48v-solar-off-grid-hybrid-inverter` |
| SUNSHINE 130W Germany Cell 12V Mono Solar Panel | SUNSHINE 130W Germany Cell 12V Mono Solar Panel Price in BD | 59 | `sunshine-130w-germany-cell-12v-mono-solar-panel` |
| SUNSHINE 150W Germany Cell 12V Mono Solar Panel | SUNSHINE 150W Germany Cell 12V Mono Solar Panel Price in BD | 59 | `sunshine-150w-germany-cell-12v-mono-solar-panel` |
| SUNSHINE 170W Germany Cell 12V Mono Solar Panel | SUNSHINE 170W Germany Cell 12V Mono Solar Panel Price in BD | 59 | `sunshine-170w-germany-cell-12v-mono-solar-panel` |
| SUNSHINE 200W Germany Cell 12V Mono Solar Panel | SUNSHINE 200W Germany Cell 12V Mono Solar Panel Price in BD | 59 | `sunshine-200w-germany-cell-12v-mono-solar-panel` |
| SUNSHINE 250W Germany Cell 24V Mono Solar Panel | SUNSHINE 250W Germany Cell 24V Mono Solar Panel Price in BD | 59 | `sunshine-250w-germany-cell-24v-mono-solar-panel` |
| SUNSHINE 55W Germany Cell 12V Mono Solar Panel | SUNSHINE 55W Germany Cell 12V Mono Solar Panel Price in BD | 58 | `sunshine-55w-germany-cell-12v-mono-solar-panel` |
| SUNSHINE 85W Germany Cell 12V Mono Solar Panel | SUNSHINE 85W Germany Cell 12V Mono Solar Panel Price in BD | 58 | `sunshine-85w-germany-cell-12v-mono-solar-panel` |
| Solis 12kW Single Phase Hybrid Inverter S6-EH1P12K03-NV-YD-L | Solis 12kW Single Phase Hybrid Inverter Price in Bangladesh | 59 | `solis-12kw-single-phase-hybrid-inverter-s6-eh1p12k03` |
| Solis 16kW Single Phase Hybrid Inverter S6-EH1P16K03-NV-YD-L | Solis 16kW Single Phase Hybrid Inverter Price in Bangladesh | 59 | `solis-16kw-single-phase-hybrid-inverter-s6-eh1p16k03` |
| Solis S6-EO1P 5K-48 5kW Single Phase Off-Grid Hybrid Inverter | Solis S6-EO1P 5K-48 5kW Off-Grid Hybrid Inverter Price in BD | 60 | `solis-s6-eo1p-5k-48-5kw-off-grid-hybrid-inverter` |
| Solis S6-EO1P 6K-48 6kW Single Phase Off-Grid Hybrid Inverter | Solis S6-EO1P 6K-48 6kW Off-Grid Hybrid Inverter Price in BD | 60 | `solis-s6-eo1p-6k-48-6kw-off-grid-hybrid-inverter` |

## Accessories (9)

| Product | Meta title | Chars | Slug |
| --- | --- | --- | --- |
| Datai Motor & Controller (Original China) | Datai Motor & Controller Original China Price in BD | 51 | `datai-motor-controller-original-china` |
| Differential 42 Inch with Motor & Controller Full Set | Differential 42 Inch Motor & Controller Set Price in BD | 55 | `differential-42-inch-motor-controller-full-set` |
| JC200 Smart Dash Camera & GPS Tracker | JC200 Smart Dash Camera & GPS Tracker Price in Bangladesh | 57 | `jc200-smart-dash-camera-gps-tracker` |
| Lithium Battery Charger | Lithium Battery Charger for EV Price in Bangladesh | 50 | `lithium-battery-charger` |
| MiLi LiTag Duo Smart Finder Tracker | MiLi LiTag Duo Smart Finder Tracker Price in Bangladesh | 55 | `mili-litag-duo-smart-finder-tracker` |
| Motor & Controller (Square) 3000W 48V/60V | Square Motor & Controller 3000W 48V/60V Price in BD | 51 | `square-motor-controller-3000w-48v-60v` |
| Sandi Borak Body Shell | Sandi Borak Body Shell Spare Part Price in Bangladesh | 53 | `sandi-borak-body-shell` |
| Sandi Borak Chassis | Sandi Borak Chassis Spare Part Price in Bangladesh | 50 | `sandi-borak-chassis` |
| Sandi Borak Rear Body Shell | Sandi Borak Rear Body Shell Price in Bangladesh | 47 | `sandi-borak-rear-body-shell` |
