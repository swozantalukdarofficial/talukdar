-- evsolutionbd.com: meta titles, corrected product names and slugs (144 products)
-- Adjust table/column names to match your schema. Run inside a transaction.
-- IMPORTANT: deploy the 301 redirects BEFORE or WITH this update.

BEGIN;

UPDATE products SET
  meta_title = 'Datai Motor & Controller Original China Price in BD',
  name       = 'Datai Motor & Controller (Original China)',
  slug       = 'datai-motor-controller-original-china'
WHERE slug = 'datai-motor-controller-original-china';

UPDATE products SET
  meta_title = 'Differential 42 Inch Motor & Controller Set Price in BD',
  name       = 'Differential 42 Inch with Motor & Controller Full Set',
  slug       = 'differential-42-inch-motor-controller-full-set'
WHERE slug = 'differencial-42-inch-with-motor-controller-full-set';

UPDATE products SET
  meta_title = 'JC200 Smart Dash Camera & GPS Tracker Price in Bangladesh',
  name       = 'JC200 Smart Dash Camera & GPS Tracker',
  slug       = 'jc200-smart-dash-camera-gps-tracker'
WHERE slug = 'vehicle-tracking-smart-car-black-box-dash-camera-pro-jc200';

UPDATE products SET
  meta_title = 'Lithium Battery Charger for EV Price in Bangladesh',
  name       = 'Lithium Battery Charger',
  slug       = 'lithium-battery-charger'
WHERE slug = 'lithium-battery-charger';

UPDATE products SET
  meta_title = 'MiLi LiTag Duo Smart Finder Tracker Price in Bangladesh',
  name       = 'MiLi LiTag Duo Smart Finder Tracker',
  slug       = 'mili-litag-duo-smart-finder-tracker'
WHERE slug = 'mili-litag-duo-smart-finder-location-tracking-device-android-ios';

UPDATE products SET
  meta_title = 'Square Motor & Controller 3000W 48V/60V Price in BD',
  name       = 'Motor & Controller (Square) 3000W 48V/60V',
  slug       = 'square-motor-controller-3000w-48v-60v'
WHERE slug = 'motor-controller-square-3000w4860';

UPDATE products SET
  meta_title = 'Sandi Borak Body Shell Spare Part Price in Bangladesh',
  name       = 'Sandi Borak Body Shell',
  slug       = 'sandi-borak-body-shell'
WHERE slug = 'sandi-borak-show';

UPDATE products SET
  meta_title = 'Sandi Borak Chassis Spare Part Price in Bangladesh',
  name       = 'Sandi Borak Chassis',
  slug       = 'sandi-borak-chassis'
WHERE slug = 'sandi-borak-chassis';

UPDATE products SET
  meta_title = 'Sandi Borak Rear Body Shell Price in Bangladesh',
  name       = 'Sandi Borak Rear Body Shell',
  slug       = 'sandi-borak-rear-body-shell'
WHERE slug = 'sandi-borak-back-show';

UPDATE products SET
  meta_title = 'AKAIYAI StackFlex Dynamic A51r100-P 5.12kWh Price in BD',
  name       = 'AKAIYAI StackFlex Dynamic A51r100-P 5.12kWh 51.2V Modular Lithium Battery',
  slug       = 'akaiyai-stackflex-a51r100-p-5-12kwh-51-2v-modular-battery'
WHERE slug = 'akaiyai-stackflex-dynamic-a51r100-p-5-12kwh-51-2v-modular-lithium-battery';

UPDATE products SET
  meta_title = 'Crown 12.8V 100Ah Lithium Battery Price in Bangladesh',
  name       = 'Crown 12.8V 100Ah Lithium Battery',
  slug       = 'crown-12-8v-100ah-lithium-battery'
WHERE slug = 'crown-12-8v-100ah-lithium-battery';

UPDATE products SET
  meta_title = 'Crown 12.8V 200Ah Lithium Battery Price in Bangladesh',
  name       = 'Crown 12.8V 200Ah Lithium Battery',
  slug       = 'crown-12-8v-200ah-lithium-battery'
WHERE slug = 'crown-12-8v-200ah-lithium-battery';

UPDATE products SET
  meta_title = 'Crown 25.6V 100Ah LiFePO4 Battery Price in Bangladesh',
  name       = 'Crown 25.6V 100Ah Lithium LiFePO4 Battery',
  slug       = 'crown-25-6v-100ah-lithium-lifepo4-battery'
WHERE slug = 'crown-25-6v-100ah-lithium-lifepo4-battery';

UPDATE products SET
  meta_title = 'DJDC 24V 100Ah IPS LiFePO4 Battery Price in Bangladesh',
  name       = 'DJDC 24V 100Ah IPS LiFePO4 Battery',
  slug       = 'djdc-24v-100ah-ips-lifepo4-battery'
WHERE slug = 'djdc-24v100ah-ips-lifepo4-battery';

UPDATE products SET
  meta_title = 'DJDC 24V 100Ah LiFePO4 Battery 2.56kWh Price in BD',
  name       = 'DJDC 24V 100Ah LiFePO4 Battery - 2.56kWh Wall-Mounted High-Capacity Solar Energy Storage',
  slug       = 'djdc-24v-100ah-2-56kwh-wall-mounted-lifepo4-battery'
WHERE slug = 'djdc-24v-100ah-lifepo4-battery-2-56kwh-wall-mounted-high-capacity-solar-energy-storage';

UPDATE products SET
  meta_title = 'DJDC 48V 100Ah Wall-Mounted LiFePO4 Battery Price in BD',
  name       = 'DJDC 48V 100Ah Wall-Mounted LiFePO4 Battery',
  slug       = 'djdc-48v-100ah-wall-mounted-lifepo4-battery'
WHERE slug = 'djdc-48v100ah-wall-mounted-lifepo4-battery';

UPDATE products SET
  meta_title = 'DJDC 48V 200Ah Wall-Mounted LiFePO4 Battery Price in BD',
  name       = 'DJDC 48V 200Ah Wall-Mounted LiFePO4 Battery',
  slug       = 'djdc-48v-200ah-wall-mounted-lifepo4-battery'
WHERE slug = 'djdc-48v200ah-wall-mounted-lifepo4-battery';

UPDATE products SET
  meta_title = 'GENIXGREEN 51.2V 100A 5.12kWh LiFePO4 Battery Price in BD',
  name       = 'GENIXGREEN 51.2V 100A 5.12kWh LiFePO4 Battery',
  slug       = 'genixgreen-51-2v-100a-5-12kwh-lifepo4-battery'
WHERE slug = 'genixgreen-51-2v-100a-5-12kwh-lifepo4-battery';

UPDATE products SET
  meta_title = 'GENIXGREEN ES-BOX12 51.2V 100Ah LiFePO4 Price in Bangladesh',
  name       = 'GENIXGREEN ES-BOX12 LCD 51.2V 100Ah 5.12kWh LiFePO4 Battery',
  slug       = 'genixgreen-es-box12-51-2v-100ah-5-12kwh-lifepo4-battery'
WHERE slug = 'genixgreen-es-box12-lcd-51-2v-100ah-5-12kw-lifepo4-battery';

UPDATE products SET
  meta_title = 'GENIXGREEN ES-BOX12 Plus 51.2V 200Ah 10.24kWh Price in BD',
  name       = 'GENIXGREEN ES-BOX12 Plus LCD 51.2V 200Ah 10.24kWh LiFePO4 Battery',
  slug       = 'genixgreen-es-box12-plus-51-2v-200ah-10-24kwh-lifepo4-battery'
WHERE slug = 'genixgreen-es-box12-plus-lcd-51-2v-200ah-10-24kw-lifepo4-battery';

UPDATE products SET
  meta_title = 'Gotion Lithium-Ion Battery Cell 3.2V 105Ah Price in BD',
  name       = 'Gotion Lithium-Ion Battery Cell 3.2V 105Ah',
  slug       = 'gotion-3-2v-105ah-lithium-ion-battery-cell'
WHERE slug = 'lithium-ion-battery-cellgotion';

UPDATE products SET
  meta_title = 'HiTHIUM HeroEE 16 51.2V 16kWh LiFePO4 Battery Price in BD',
  name       = 'HiTHIUM HeroEE 16 51.2V 16kWh LiFePO4 Battery',
  slug       = 'hithium-heroee-16-51-2v-16kwh-lifepo4-battery'
WHERE slug = 'hithium-heroee-16-51-2v-16kwh-lifepo4-battery';

UPDATE products SET
  meta_title = 'HiTHIUM HeroEE NeoPower 12.8V 314Ah 4kWh Price in BD',
  name       = 'HiTHIUM HeroEE NeoPower 4 12.8V 314Ah 4kWh LiFePO4 Lithium Battery',
  slug       = 'hithium-heroee-neopower-4-12-8v-314ah-4kwh-lifepo4-battery'
WHERE slug = 'hithium-heroee-neopower-4-12-8v-314ah-4kwh-lifepo-lithium-battery';

UPDATE products SET
  meta_title = 'LVTOPSUN 12.8V 280Ah 3.58kWh LiFePO4 Battery Price in BD',
  name       = 'LVTOPSUN 12.8V 280Ah 3.58kWh Lithium Iron Phosphate Battery',
  slug       = 'lvtopsun-12-8v-280ah-3-58kwh-lifepo4-battery'
WHERE slug = 'lvtopsun-12-8v-280ah-3-58kwh-lithium-iron-phosphate-battery';

UPDATE products SET
  meta_title = 'LVTOPSUN 25.6V 100Ah 2.56kWh LiFePO4 Battery Price in BD',
  name       = 'LVTOPSUN 25.6V 100Ah 2.56 kWh Lithium Iron Phosphate Battery (ABS Case)',
  slug       = 'lvtopsun-25-6v-100ah-2-56kwh-lifepo4-battery-abs-case'
WHERE slug = 'lvtopsun-25-6v-100ah-2-56-kwh-lithium-iron-phosphate-battery-abs-case';

UPDATE products SET
  meta_title = 'LVTOPSUN 25.6V 100Ah 2.56kWh LiFePO4 Metal Case Battery',
  name       = 'LVTOPSUN 25.6V 100Ah 2.56kWh LiFePO4 Battery (Metal Case)',
  slug       = 'lvtopsun-25-6v-100ah-2-56kwh-lifepo4-battery-metal-case'
WHERE slug = 'lvtopsun-25-6v-100ah-2-56-kwh-lithium-iron-phosphate-battery';

UPDATE products SET
  meta_title = 'LVTOPSUN 25.6V 200Ah 5.12kWh LiFePO4 Battery Price in BD',
  name       = 'LVTOPSUN 25.6V 200Ah 5.12kWh Lithium Iron Phosphate Battery',
  slug       = 'lvtopsun-25-6v-200ah-5-12kwh-lifepo4-battery'
WHERE slug = 'lvtopsun-25-6v-200ah-5-12kwh-lithium-iron-phosphate-battery';

UPDATE products SET
  meta_title = 'LVTOPSUN 25.6V 200Ah LiFePO4 Battery Price in Bangladesh',
  name       = 'LVTOPSUN 25.6V 200Ah Lithium LiFePO4 Battery',
  slug       = 'lvtopsun-25-6v-200ah-lithium-lifepo4-battery'
WHERE slug = 'lvtopsun-25-6v-200ah-lithium-lifepo4-battery';

UPDATE products SET
  meta_title = 'LVTOPSUN 51.2V 100Ah 5.12kWh LiFePO4 Rack Mount Battery',
  name       = 'LVTOPSUN 51.2V 100Ah 5.12kWh LiFePO4 Battery (Rack Mount, WiFi)',
  slug       = 'lvtopsun-51-2v-100ah-5-12kwh-lifepo4-battery-rack-mount'
WHERE slug = 'lvtopsun-51-2v-100ah-5-12kwh-lithium-iron-phosphate-battery';

UPDATE products SET
  meta_title = 'LVTOPSUN 51.2V 100Ah 5.12kWh LiFePO4 Touchscreen Battery',
  name       = 'LVTOPSUN 51.2V 100Ah 5.12kWh LiFePO4 Battery (Touchscreen, Floor/Wall)',
  slug       = 'lvtopsun-51-2v-100ah-5-12kwh-lifepo4-battery-touchscreen'
WHERE slug = 'lvtopsun-51-2v-100ah-5-12kwh-lithium-iron-phosphate-battery-26';

UPDATE products SET
  meta_title = 'LVTOPSUN 51.2V 200Ah 10.24kWh LiFePO4 Battery Price in BD',
  name       = 'LVTOPSUN 51.2V 200Ah 10.24kWh Lithium Iron Phosphate Battery',
  slug       = 'lvtopsun-51-2v-200ah-10-24kwh-lifepo4-battery'
WHERE slug = 'lvtopsun-51-2v-200ah-10-24kwh-lithium-iron-phosphate-battery';

UPDATE products SET
  meta_title = 'LVTOPSUN G3 51.2V 314A 16kWh LiFePO4 Storage Price in BD',
  name       = 'LVTOPSUN G3 51.2V 314A 16 kWh LiFePO4 Solar Energy Storage Battery',
  slug       = 'lvtopsun-g3-51-2v-314ah-16kwh-lifepo4-storage-battery'
WHERE slug = 'lvtopsun-g3-51-2v-314a-16-kwh-lifepo-solar-energy-storage-battery';

UPDATE products SET
  meta_title = 'LVTOPSUN LVTS-512100-G3A 51.2V 100Ah LiFePO4 Price in BD',
  name       = 'LVTOPSUN LVTS-512100-G3A 51.2V 100Ah 5.12kWh LiFePO4 Battery',
  slug       = 'lvtopsun-lvts-512100-g3a-51-2v-100ah-5-12kwh-lifepo4-battery'
WHERE slug = 'lvtopsun-lvts-512100-g3a-51-2v-100ah-5-12kwh-lifepo4-battery';

UPDATE products SET
  meta_title = 'LVTOPSUN LVTS-512314-G3A 51.2V 314Ah LiFePO4 Price in BD',
  name       = 'LVTOPSUN LVTS-512314-G3A 51.2V 314Ah 16kWh LiFePO4 Battery',
  slug       = 'lvtopsun-lvts-512314-g3a-51-2v-314ah-16kwh-lifepo4-battery'
WHERE slug = 'lvtopsun-lvts-512314-g3a-51-2v-314ah-16kwh-lifepo4-battery';

UPDATE products SET
  meta_title = 'Luxwatt 12.8V 200Ah 2.56kWh LiFePO4 Battery Price in BD',
  name       = 'Luxwatt 12.8V 200Ah 2.56kWh LiFePO4 Battery',
  slug       = 'luxwatt-12-8v-200ah-2-56kwh-lifepo4-battery'
WHERE slug = 'luxwatt-12-8v-200ah-2-56kwh-lifepo4-battery';

UPDATE products SET
  meta_title = 'SAKO 12V 100Ah LiFePO4 Lithium Battery Price in Bangladesh',
  name       = 'SAKO 12V 100Ah LiFePO4 Lithium Battery',
  slug       = 'sako-12v-100ah-lifepo4-battery'
WHERE slug = 'sako-12v-100ah-lifepo-lithium-battery';

UPDATE products SET
  meta_title = 'Akij City E-Cab Pothik - 100 KM Range Price in Bangladesh',
  name       = 'Akij City E-Cab Pothik',
  slug       = 'akij-city-e-cab-pothik'
WHERE slug = 'city-e-cab-pothik';

UPDATE products SET
  meta_title = 'Akij Delivery Van - 40-200 KM Range Price in Bangladesh',
  name       = 'Akij Delivery Van',
  slug       = 'akij-delivery-van'
WHERE slug = 'delivery-van';

UPDATE products SET
  meta_title = 'Akij Electric Pick-Up - Commercial EV Price in Bangladesh',
  name       = 'Akij Electric Pick-Up',
  slug       = 'akij-electric-pick-up'
WHERE slug = 'electric-pick-up';

UPDATE products SET
  meta_title = 'Akij Electric Rickshaw Pigeon Price in Bangladesh',
  name       = 'Akij Electric Rickshaw Pigeon',
  slug       = 'akij-electric-rickshaw-pigeon'
WHERE slug = 'electric-rikshaw-pigeon';

UPDATE products SET
  meta_title = 'Akij Elizabeth Antique Car Price in Bangladesh',
  name       = 'Akij Elizabeth Antique Car',
  slug       = 'akij-elizabeth-antique-car'
WHERE slug = 'antique-car-elezabeth';

UPDATE products SET
  meta_title = 'Akij Mini Cargo Van - 40-200 KM Range Price in Bangladesh',
  name       = 'Akij Mini Cargo Van',
  slug       = 'akij-mini-cargo-van'
WHERE slug = 'mini-cargo-van';

UPDATE products SET
  meta_title = 'Akij Recreation & Sightseeing Car Price in Bangladesh',
  name       = 'Akij Recreation & Sightseeing Car',
  slug       = 'akij-recreation-sightseeing-car'
WHERE slug = 'recreationsightseeing-car';

UPDATE products SET
  meta_title = 'Akij Sightseeing Bus - 100 KM Range Price in Bangladesh',
  name       = 'Akij Sightseeing Bus',
  slug       = 'akij-sightseeing-bus'
WHERE slug = 'sightseeing-bus';

UPDATE products SET
  meta_title = 'Akij Solar E-Rickshaw - 800 Watt Motor Price in Bangladesh',
  name       = 'Akij Solar E-Rickshaw',
  slug       = 'akij-solar-e-rickshaw'
WHERE slug = 'solar-e-rickshaw';

UPDATE products SET
  meta_title = 'Akij Songi Electric Vehicle Price in Bangladesh',
  name       = 'Akij Songi Electric Vehicle',
  slug       = 'akij-songi-electric-vehicle'
WHERE slug = 'electric-vehicle-songi';

UPDATE products SET
  meta_title = 'Aima F520 - Electric Scooter Price in Bangladesh',
  name       = 'Aima F520',
  slug       = 'aima-f520'
WHERE slug = 'aima-f520';

UPDATE products SET
  meta_title = 'Aima F626 - Electric Scooter Price in Bangladesh',
  name       = 'Aima F626',
  slug       = 'aima-f626'
WHERE slug = 'aima-f626';

UPDATE products SET
  meta_title = 'Akij Bondhu - 600 W Motor Price in Bangladesh',
  name       = 'Akij Bondhu',
  slug       = 'akij-bondhu'
WHERE slug = 'bondhu';

UPDATE products SET
  meta_title = 'Akij Dorian - 2000 Watt Motor Price in Bangladesh',
  name       = 'Akij Dorian',
  slug       = 'akij-dorian'
WHERE slug = 'dorian';

UPDATE products SET
  meta_title = 'Akij Durbar - 2500 W Motor Price in Bangladesh',
  name       = 'Akij Durbar',
  slug       = 'akij-durbar'
WHERE slug = 'durbar';

UPDATE products SET
  meta_title = 'Akij Durdanto V6 - 3000 W Motor Price in Bangladesh',
  name       = 'Akij Durdanto V6',
  slug       = 'akij-durdanto-v6'
WHERE slug = 'durdanto-v6';

UPDATE products SET
  meta_title = 'Akij Durjoy - Electric Scooter Price in Bangladesh',
  name       = 'Akij Durjoy',
  slug       = 'akij-durjoy'
WHERE slug = 'akij-durjoy-price';

UPDATE products SET
  meta_title = 'Akij Durjoy 150kg - 1000 W Motor Price in Bangladesh',
  name       = 'Akij Durjoy 150kg',
  slug       = 'akij-durjoy-150kg'
WHERE slug = 'durjoy';

UPDATE products SET
  meta_title = 'Akij Duronto - 1200 W Motor Price in Bangladesh',
  name       = 'Akij Duronto',
  slug       = 'akij-duronto'
WHERE slug = 'duronto';

UPDATE products SET
  meta_title = 'Akij Electric Scooter - 50-200 KM Range Price in Bangladesh',
  name       = 'Akij Electric Scooter',
  slug       = 'akij-electric-scooter'
WHERE slug = 'electric-scooter';

UPDATE products SET
  meta_title = 'Akij Ponkhiraj - 1000 W Motor Price in Bangladesh',
  name       = 'Akij Ponkhiraj',
  slug       = 'akij-ponkhiraj'
WHERE slug = 'ponkhiraj';

UPDATE products SET
  meta_title = 'Akij Ponkhiraj 48V - Electric Bike Price in Bangladesh',
  name       = 'Akij Ponkhiraj 48V',
  slug       = 'akij-ponkhiraj-48v'
WHERE slug = 'akij-ponkhiraj-48v';

UPDATE products SET
  meta_title = 'Akij Sathi 60V Electric Bike Price in Bangladesh',
  name       = 'Akij Sathi 60V',
  slug       = 'akij-sathi-60v'
WHERE slug = 'akij-sathi-60v';

UPDATE products SET
  meta_title = 'Atom 3-Wheel Electric Passenger Tricycle Price in BD',
  name       = 'Atom 3-Wheel Electric Passenger Tricycle',
  slug       = 'atom-3-wheel-electric-passenger-tricycle'
WHERE slug = 'atom-3-wheel-electric-passenger-tricycle';

UPDATE products SET
  meta_title = 'EZ-GO Family Electric Scooter Price in Bangladesh',
  name       = 'EZ-GO Family',
  slug       = 'ez-go-family'
WHERE slug = 'ez-go-ez-go-family';

UPDATE products SET
  meta_title = 'EZ-GO Hunter - Electric Scooter Price in Bangladesh',
  name       = 'EZ-GO Hunter',
  slug       = 'ez-go-hunter'
WHERE slug = 'ez-go-ez-go-hunter';

UPDATE products SET
  meta_title = 'EZ-GO Venturer - Electric Scooter Price in Bangladesh',
  name       = 'EZ-GO Venturer',
  slug       = 'ez-go-venturer'
WHERE slug = 'ez-go-ez-go-venturer';

UPDATE products SET
  meta_title = 'Electric Cargo Loader Heavy Duty Price in Bangladesh',
  name       = 'Electric Cargo Loader (Heavy Duty)',
  slug       = 'electric-cargo-loader-heavy-duty'
WHERE slug = 'electric-cargo-loaderheavy';

UPDATE products SET
  meta_title = 'Electric Cargo Van 100-200km Price in Bangladesh',
  name       = 'Electric Cargo Van (100-200km)',
  slug       = 'electric-cargo-van-100-200km'
WHERE slug = 'electric-cargo-van';

UPDATE products SET
  meta_title = 'Electric Cycle - 40 km Range Price in Bangladesh',
  name       = 'Electric Cycle',
  slug       = 'electric-cycle'
WHERE slug = 'electric-cycle';

UPDATE products SET
  meta_title = 'Electric Delivery Van PG Model Price in Bangladesh',
  name       = 'Electric Delivery Van (PG)',
  slug       = 'electric-delivery-van-pg'
WHERE slug = 'delivery-vanpg';

UPDATE products SET
  meta_title = 'Electric Food Cart for Business Price in Bangladesh',
  name       = 'Electric Food Cart',
  slug       = 'electric-food-cart'
WHERE slug = 'food-cart';

UPDATE products SET
  meta_title = 'Electric Mini Covered Van TMI Price in Bangladesh',
  name       = 'Electric Mini Covered Van (TMI)',
  slug       = 'electric-mini-covered-van-tmi'
WHERE slug = 'electric-mini-covered-van-tmi';

UPDATE products SET
  meta_title = 'Electric Mini Delivery Van 6 Feet Price in Bangladesh',
  name       = 'Electric Mini Delivery Van 6 Feet',
  slug       = 'electric-mini-delivery-van-6-feet'
WHERE slug = 'electric-mini-delivery-van-6-feet';

UPDATE products SET
  meta_title = 'Electric Mini School Bus 100-250km Price in Bangladesh',
  name       = 'Electric Mini School Bus',
  slug       = 'electric-mini-school-bus'
WHERE slug = 'electric-mini-school-buss';

UPDATE products SET
  meta_title = 'Electric Mini School Bus Open Price in Bangladesh',
  name       = 'Electric Mini School Bus (Open)',
  slug       = 'electric-mini-school-bus-open'
WHERE slug = 'electric-mini-school-buss-open';

UPDATE products SET
  meta_title = 'Electric Scooty Cycle for Girls Price in Bangladesh',
  name       = 'Electric Scooty Cycle',
  slug       = 'electric-scooty-cycle'
WHERE slug = 'electric-scooty-cycle';

UPDATE products SET
  meta_title = 'Eve Motors Smart Scooter Price in Bangladesh - 60V',
  name       = 'Eve Motors Smart Scooter',
  slug       = 'eve-motors-smart-scooter'
WHERE slug = 'eve-motors-eve-smart-scooter';

UPDATE products SET
  meta_title = 'Exploit 3043 Plus - Electric Scooter Price in Bangladesh',
  name       = 'Exploit 3043 Plus',
  slug       = 'exploit-3043-plus'
WHERE slug = 'exploit-3043-plus';

UPDATE products SET
  meta_title = 'Falcon DX1200 DT - Electric Scooter Price in Bangladesh',
  name       = 'Falcon DX1200 DT',
  slug       = 'falcon-dx1200-dt'
WHERE slug = 'falcon-dx1200-dt';

UPDATE products SET
  meta_title = 'Green Tiger GT Fenix XR - Electric Bike Price in Bangladesh',
  name       = 'Green Tiger GT Fenix XR',
  slug       = 'green-tiger-gt-fenix-xr'
WHERE slug = 'green-tiger-gt-fenix-xr';

UPDATE products SET
  meta_title = 'Green Tiger JR Vive - Electric Scooter Price in Bangladesh',
  name       = 'Green Tiger JR Vive',
  slug       = 'green-tiger-jr-vive'
WHERE slug = 'green-tiger-jr-vive';

UPDATE products SET
  meta_title = 'Nasir Syntax Avento - Electric Scooter Price in Bangladesh',
  name       = 'Nasir Syntax Avento',
  slug       = 'nasir-syntax-avento'
WHERE slug = 'nasir-syntax-motors-syntax-avento';

UPDATE products SET
  meta_title = 'Nasir Syntax Gen Z - Electric Scooter Price in Bangladesh',
  name       = 'Nasir Syntax Gen Z',
  slug       = 'nasir-syntax-gen-z'
WHERE slug = 'nasir-syntax-motors-syntax-gen-z';

UPDATE products SET
  meta_title = 'Nasir Syntax Lima - Electric Scooter Price in Bangladesh',
  name       = 'Nasir Syntax Lima',
  slug       = 'nasir-syntax-lima'
WHERE slug = 'nasir-syntax-motors-syntax-lima';

UPDATE products SET
  meta_title = 'Nasir Syntax Rayo - Electric Scooter Price in Bangladesh',
  name       = 'Nasir Syntax Rayo',
  slug       = 'nasir-syntax-rayo'
WHERE slug = 'nasir-syntax-motors-syntax-rayo';

UPDATE products SET
  meta_title = 'Revoo A01 - Electric Scooter Price in Bangladesh',
  name       = 'Revoo A01',
  slug       = 'revoo-a01'
WHERE slug = 'revoo-a01';

UPDATE products SET
  meta_title = 'Revoo A11 - Electric Scooter Price in Bangladesh',
  name       = 'Revoo A11',
  slug       = 'revoo-a11'
WHERE slug = 'revoo-a11';

UPDATE products SET
  meta_title = 'Revoo A12 - Electric Scooter Price in Bangladesh',
  name       = 'Revoo A12',
  slug       = 'revoo-a12'
WHERE slug = 'revoo-a12';

UPDATE products SET
  meta_title = 'Revoo C00 - Electric Scooter Price in Bangladesh',
  name       = 'Revoo C00',
  slug       = 'revoo-c00'
WHERE slug = 'revoo-c00';

UPDATE products SET
  meta_title = 'Revoo C03 - Electric Scooter Price in Bangladesh',
  name       = 'Revoo C03',
  slug       = 'revoo-c03'
WHERE slug = 'revoo-c03';

UPDATE products SET
  meta_title = 'Revoo C32 - Electric Scooter Price in Bangladesh',
  name       = 'Revoo C32',
  slug       = 'revoo-c32'
WHERE slug = 'revoo-c32';

UPDATE products SET
  meta_title = 'Revoo E52 - Electric Scooter Price in Bangladesh',
  name       = 'Revoo E52',
  slug       = 'revoo-e52'
WHERE slug = 'revoo-e52';

UPDATE products SET
  meta_title = 'Revoo Falcon XN3000 - Electric Scooter Price in Bangladesh',
  name       = 'Revoo Falcon XN3000',
  slug       = 'revoo-falcon-xn3000'
WHERE slug = 'revoo-falcon-xn3000';

UPDATE products SET
  meta_title = 'Rydo Blaze White - Electric Scooter Price in Bangladesh',
  name       = 'Rydo Blaze White',
  slug       = 'rydo-blaze-white'
WHERE slug = 'rydo-blaze-white';

UPDATE products SET
  meta_title = 'Sandi Borak China Electric Tricycle Price in Bangladesh',
  name       = 'Sandi Borak (China)',
  slug       = 'sandi-borak-china'
WHERE slug = 'sandi-borak-china';

UPDATE products SET
  meta_title = 'Sandi Borak Folding Seat Original China Price in BD',
  name       = 'Sandi Borak Folding Seat (Original China)',
  slug       = 'sandi-borak-folding-seat-original-china'
WHERE slug = 'sandi-borak-folding-seat-original-china';

UPDATE products SET
  meta_title = 'Sandi Electronics Cargo Van Price in Bangladesh',
  name       = 'Sandi Electronics Cargo Van Tricycle',
  slug       = 'sandi-electronics-cargo-van-tricycle'
WHERE slug = 'cargo-vansandi-electrinics-tricycleco';

UPDATE products SET
  meta_title = 'Sandi Mini Folding Seat Tricycle Price in Bangladesh',
  name       = 'Sandi Mini Folding Seat Tricycle',
  slug       = 'sandi-mini-folding-seat-tricycle'
WHERE slug = 'sandi-mini-folding-seat';

UPDATE products SET
  meta_title = 'Star Dowedo Electric Tricycle Price in Bangladesh',
  name       = 'Star Dowedo Electric Tricycle',
  slug       = 'star-dowedo-electric-tricycle'
WHERE slug = 'star-dowedo';

UPDATE products SET
  meta_title = 'Tailg F72 Leopard - Electric Scooter Price in Bangladesh',
  name       = 'Tailg F72 Leopard',
  slug       = 'tailg-f72-leopard'
WHERE slug = 'tailg-f72-leopard';

UPDATE products SET
  meta_title = 'Tailg Phoenix F73 - Electric Scooter Price in Bangladesh',
  name       = 'Tailg Phoenix F73',
  slug       = 'tailg-phoenix-f73'
WHERE slug = 'tailg-phoenix-f73';

UPDATE products SET
  meta_title = 'Tailg Saibei F71 - Electric Scooter Price in Bangladesh',
  name       = 'Tailg Saibei F71',
  slug       = 'tailg-saibei-f71'
WHERE slug = 'tailg-saibei-f71';

UPDATE products SET
  meta_title = 'Titan Crown/Star 80-200km Range Price in Bangladesh',
  name       = 'Titan Crown / Star',
  slug       = 'titan-crown-star'
WHERE slug = 'titan-crown-star';

UPDATE products SET
  meta_title = 'Titan Golden/Blue Electric Bike Price in Bangladesh',
  name       = 'Titan Golden / Blue',
  slug       = 'titan-golden-blue'
WHERE slug = 'titan-goldenblue';

UPDATE products SET
  meta_title = 'Walton Takyon - Electric Scooter Price in Bangladesh',
  name       = 'Walton Takyon',
  slug       = 'walton-takyon'
WHERE slug = 'walton-takyon';

UPDATE products SET
  meta_title = 'Walton Takyon 100 - Electric Scooter Price in Bangladesh',
  name       = 'Walton Takyon 100',
  slug       = 'walton-takyon-100'
WHERE slug = 'walton-takyon-1-00';

UPDATE products SET
  meta_title = 'Walton Takyon Fusion 25FZ Price in Bangladesh',
  name       = 'Walton Takyon Fusion 25FZ',
  slug       = 'walton-takyon-fusion-25fz'
WHERE slug = 'walton-takyon-fusion-25fz';

UPDATE products SET
  meta_title = 'Walton Takyon Leo - Electric Scooter Price in Bangladesh',
  name       = 'Walton Takyon Leo',
  slug       = 'walton-takyon-leo'
WHERE slug = 'walton-takyon-leo';

UPDATE products SET
  meta_title = 'Walton Takyon Leo 25T1 - Electric Bike Price in Bangladesh',
  name       = 'Walton Takyon Leo 25T1',
  slug       = 'walton-takyon-leo-25t1'
WHERE slug = 'walton-takyon-fusion-25t1';

UPDATE products SET
  meta_title = 'Yadea E8S 200 Electric Scooter Price in Bangladesh',
  name       = 'Yadea E8S 200',
  slug       = 'yadea-e8s-200'
WHERE slug = 'yadea-e8s200';

UPDATE products SET
  meta_title = 'Yadea E8S Pro - Electric Scooter Price in Bangladesh',
  name       = 'Yadea E8S Pro',
  slug       = 'yadea-e8s-pro'
WHERE slug = 'yadea-e8s-pro';

UPDATE products SET
  meta_title = 'Yadea G150P - Electric Scooter Price in Bangladesh',
  name       = 'Yadea G150P',
  slug       = 'yadea-g150p'
WHERE slug = 'yadea-g150p';

UPDATE products SET
  meta_title = 'Yadea GT60 - Electric Scooter Price in Bangladesh',
  name       = 'Yadea GT60',
  slug       = 'yadea-gt60'
WHERE slug = 'yadea-gt60';

UPDATE products SET
  meta_title = 'Yadea M6 - Electric Scooter Price in Bangladesh',
  name       = 'Yadea M6',
  slug       = 'yadea-m6'
WHERE slug = 'yadea-m6';

UPDATE products SET
  meta_title = 'Yadea T5 - Electric Scooter Price in Bangladesh',
  name       = 'Yadea T5',
  slug       = 'yadea-t5'
WHERE slug = 'yadea-t5';

UPDATE products SET
  meta_title = 'Yadea Velax - Electric Scooter Price in Bangladesh',
  name       = 'Yadea Velax',
  slug       = 'yadea-velax'
WHERE slug = 'yadea-velax';

UPDATE products SET
  meta_title = 'Yundi Original China Electric Bike Price in Bangladesh',
  name       = 'Yundi Original (China)',
  slug       = 'yundi-original-china'
WHERE slug = 'yundi-orinal-china';

UPDATE products SET
  meta_title = 'Zeeho AE8 SE - 45-50 km Range Price in Bangladesh',
  name       = 'Zeeho AE8 SE',
  slug       = 'zeeho-ae8-se'
WHERE slug = 'zeeho-ae8-se';

UPDATE products SET
  meta_title = 'AE Solar 550W MD-144 Series Price in Bangladesh',
  name       = 'AE Solar 550W MD-144 Series',
  slug       = 'ae-solar-550w-md-144-series'
WHERE slug = 'ae-solar-550w-ae-md-144-series';

UPDATE products SET
  meta_title = 'Crown Micro ARCEUS 6.5kW 48V MPPT Solar Inverter Price in BD',
  name       = 'Crown Micro ARCEUS 6.5kW 48V MPPT Solar Inverter',
  slug       = 'crown-micro-arceus-6-5kw-48v-mppt-solar-inverter'
WHERE slug = 'crown-micro-arceus-65kw-48v-pv-7800w-mppt-solar-inverter';

UPDATE products SET
  meta_title = 'GoodWe 5kW Off-Grid Hybrid Inverter Price in Bangladesh',
  name       = 'GoodWe 5kW Off-Grid Hybrid Inverter',
  slug       = 'goodwe-5kw-off-grid-hybrid-inverter'
WHERE slug = 'goodwe-5kw-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'Growatt SPF 3500 3.5kW 48V Off-Grid Inverter Price in BD',
  name       = 'Growatt SPF 3500 ES 3.5kW 48V Off-Grid Hybrid Inverter',
  slug       = 'growatt-spf-3500-es-3-5kw-48v-off-grid-hybrid-inverter'
WHERE slug = 'growatt-spf-3500-es-35kw-48v-off-grid-hybrid-solar-inverter';

UPDATE products SET
  meta_title = 'JA Solar Deep Blue 4.0 615W Bifacial Panel Price in BD',
  name       = 'JA Solar Deep Blue 4.0 Pro 615W Bifacial Solar Panel',
  slug       = 'ja-solar-deep-blue-4-0-pro-615w-bifacial-solar-panel'
WHERE slug = 'ja-solar-deep-blue-40-pro-615w-bifacial-solar-panel';

UPDATE products SET
  meta_title = 'JA Solar Deep Blue 4.0 620W Bifacial Panel Price in BD',
  name       = 'JA Solar Deep Blue 4.0 Pro 620W Bifacial Solar Panel',
  slug       = 'ja-solar-deep-blue-4-0-pro-620w-bifacial-solar-panel'
WHERE slug = 'ja-solar-deep-blue-40-pro-620w-bifacial-solar-panel';

UPDATE products SET
  meta_title = 'Jinko 615W N-Type Bifacial Solar Panel Price in Bangladesh',
  name       = 'Jinko 615W N-Type Bifacial Solar Panel (Official)',
  slug       = 'jinko-615w-n-type-bifacial-solar-panel'
WHERE slug = 'jinko-615w-n-type-bifacial-solar-panel-official';

UPDATE products SET
  meta_title = 'LVTOPSUN 12kW 48V Solar Off-Grid Hybrid Inverter Price in BD',
  name       = 'LVTOPSUN 12kW 48V Solar Off-Grid Hybrid Inverter',
  slug       = 'lvtopsun-12kw-48v-solar-off-grid-hybrid-inverter'
WHERE slug = 'lvtopsun-12kw-48v-solar-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'LVTOPSUN 4kW 24V Solar Off-Grid Hybrid Inverter Price in BD',
  name       = 'LVTOPSUN 4kW 24V Solar Off-Grid Hybrid Inverter',
  slug       = 'lvtopsun-4kw-24v-solar-off-grid-hybrid-inverter'
WHERE slug = 'lvtopsun-4kw-24v-solar-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'LVTOPSUN 6kW 48V Solar Off-Grid Hybrid Inverter Price in BD',
  name       = 'LVTOPSUN 6kW 48V Solar Off-Grid Hybrid Inverter',
  slug       = 'lvtopsun-6kw-48v-solar-off-grid-hybrid-inverter'
WHERE slug = 'lvtopsun-6kw-48v-solar-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'REC Alpha Pro M 600W HJT Mono Panel Price in Bangladesh',
  name       = 'REC Alpha Pro M 600W Heterojunction Mono Solar Panel',
  slug       = 'rec-alpha-pro-m-600w-heterojunction-mono-solar-panel'
WHERE slug = 'rec-alpha-pro-m-600w-heterojunction-mono-solar-panel';

UPDATE products SET
  meta_title = 'REC Alpha Pro M 610W HJT Mono Panel Price in Bangladesh',
  name       = 'REC Alpha Pro M 610W Heterojunction Mono Solar Panel',
  slug       = 'rec-alpha-pro-m-610w-heterojunction-mono-solar-panel'
WHERE slug = 'rec-alpha-pro-m-610w-heterojunction-mono-solar-panel';

UPDATE products SET
  meta_title = 'SAKO E-SUN 1.2KVA 12V Off-Grid Hybrid Inverter Price in BD',
  name       = 'SAKO E-SUN 1.2KVA 12V Off-Grid Hybrid Inverter',
  slug       = 'sako-e-sun-1-2kva-12v-off-grid-hybrid-inverter'
WHERE slug = 'sako-e-sun-12kva-12v-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'SAKO E-SUN 2KVA 12V Off-Grid Hybrid Inverter Price in BD',
  name       = 'SAKO E-SUN 2KVA 12V Off-Grid Hybrid Inverter',
  slug       = 'sako-e-sun-2kva-12v-off-grid-hybrid-inverter'
WHERE slug = 'sako-e-sun-2kva-12v-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'SAKO E-SUN 3KVA 24V Off-Grid Hybrid Inverter Price in BD',
  name       = 'SAKO E-SUN 3KVA 24V Off-Grid Hybrid Inverter',
  slug       = 'sako-e-sun-3kva-24v-off-grid-hybrid-inverter'
WHERE slug = 'sako-e-sun-3kva-24v-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'SAKO E-SUN 4.2kVA 24V Off-Grid Hybrid Inverter Price in BD',
  name       = 'SAKO E-SUN 4.2kVA 24V Off-Grid Hybrid Inverter',
  slug       = 'sako-e-sun-4-2kva-24v-off-grid-hybrid-inverter'
WHERE slug = 'sako-e-sun-42kva-24v-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'SAKO Sunon V 4.5K 24V Off-Grid Hybrid Inverter Price in BD',
  name       = 'SAKO Sunon V 4.5K 24V Off-Grid Hybrid Inverter',
  slug       = 'sako-sunon-v-4-5k-24v-off-grid-hybrid-inverter'
WHERE slug = 'sako-sunon-v-45k-24v-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'SOSEN 5.5kW 48V Solar Off-Grid Hybrid Inverter Price in BD',
  name       = 'SOSEN 5.5kW 48V Solar Off-Grid Hybrid Inverter',
  slug       = 'sosen-5-5kw-48v-solar-off-grid-hybrid-inverter'
WHERE slug = 'sosen-55kw-48v-solar-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'SUNSHINE 130W Germany Cell 12V Mono Solar Panel Price in BD',
  name       = 'SUNSHINE 130W Germany Cell 12V Mono Solar Panel',
  slug       = 'sunshine-130w-germany-cell-12v-mono-solar-panel'
WHERE slug = 'sunshine-130w-germany-cell-12v-mono-solar-panel';

UPDATE products SET
  meta_title = 'SUNSHINE 150W Germany Cell 12V Mono Solar Panel Price in BD',
  name       = 'SUNSHINE 150W Germany Cell 12V Mono Solar Panel',
  slug       = 'sunshine-150w-germany-cell-12v-mono-solar-panel'
WHERE slug = 'sunshine-150w-germany-cell-12v-mono-solar-panel';

UPDATE products SET
  meta_title = 'SUNSHINE 170W Germany Cell 12V Mono Solar Panel Price in BD',
  name       = 'SUNSHINE 170W Germany Cell 12V Mono Solar Panel',
  slug       = 'sunshine-170w-germany-cell-12v-mono-solar-panel'
WHERE slug = 'sunshine-170w-germany-cell-12v-mono-solar-panel';

UPDATE products SET
  meta_title = 'SUNSHINE 200W Germany Cell 12V Mono Solar Panel Price in BD',
  name       = 'SUNSHINE 200W Germany Cell 12V Mono Solar Panel',
  slug       = 'sunshine-200w-germany-cell-12v-mono-solar-panel'
WHERE slug = 'sunshine-200w-germany-cell-12v-mono-solar-panel';

UPDATE products SET
  meta_title = 'SUNSHINE 250W Germany Cell 24V Mono Solar Panel Price in BD',
  name       = 'SUNSHINE 250W Germany Cell 24V Mono Solar Panel',
  slug       = 'sunshine-250w-germany-cell-24v-mono-solar-panel'
WHERE slug = 'sunshine-250w-germany-cell-24v-mono-solar-panel';

UPDATE products SET
  meta_title = 'SUNSHINE 55W Germany Cell 12V Mono Solar Panel Price in BD',
  name       = 'SUNSHINE 55W Germany Cell 12V Mono Solar Panel',
  slug       = 'sunshine-55w-germany-cell-12v-mono-solar-panel'
WHERE slug = 'sunshine-55w-germany-cell-12v-mono-solar-panel';

UPDATE products SET
  meta_title = 'SUNSHINE 85W Germany Cell 12V Mono Solar Panel Price in BD',
  name       = 'SUNSHINE 85W Germany Cell 12V Mono Solar Panel',
  slug       = 'sunshine-85w-germany-cell-12v-mono-solar-panel'
WHERE slug = 'sunshine-85w-germany-cell-12v-mono-solar-panel';

UPDATE products SET
  meta_title = 'Solis 12kW Single Phase Hybrid Inverter Price in Bangladesh',
  name       = 'Solis 12kW Single Phase Hybrid Inverter S6-EH1P12K03-NV-YD-L',
  slug       = 'solis-12kw-single-phase-hybrid-inverter-s6-eh1p12k03'
WHERE slug = 'solis-12kw-single-phase-hybrid-inverter-s6-eh1p12k03-nv-yd-l';

UPDATE products SET
  meta_title = 'Solis 16kW Single Phase Hybrid Inverter Price in Bangladesh',
  name       = 'Solis 16kW Single Phase Hybrid Inverter S6-EH1P16K03-NV-YD-L',
  slug       = 'solis-16kw-single-phase-hybrid-inverter-s6-eh1p16k03'
WHERE slug = 'solis-16kw-single-phase-hybrid-inverter-s6-eh1p16k03-nv-yd-l';

UPDATE products SET
  meta_title = 'Solis S6-EO1P 5K-48 5kW Off-Grid Hybrid Inverter Price in BD',
  name       = 'Solis S6-EO1P 5K-48 5kW Single Phase Off-Grid Hybrid Inverter',
  slug       = 'solis-s6-eo1p-5k-48-5kw-off-grid-hybrid-inverter'
WHERE slug = 'solis-s6-eo1p-5k-48-5kw-single-phase-off-grid-hybrid-inverter';

UPDATE products SET
  meta_title = 'Solis S6-EO1P 6K-48 6kW Off-Grid Hybrid Inverter Price in BD',
  name       = 'Solis S6-EO1P 6K-48 6kW Single Phase Off-Grid Hybrid Inverter',
  slug       = 'solis-s6-eo1p-6k-48-6kw-off-grid-hybrid-inverter'
WHERE slug = 'solis-s6-eo1p-6k-48-6kw-single-phase-off-grid-hybrid-inverter';

COMMIT;
