-- ================================================================
-- SQL Script to import Solar Panels into EVStore Bangladesh DB
-- Run this in your Supabase SQL Editor
-- ================================================================

-- 1. Drop existing check constraint and add updated one with 'solar'
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check CHECK (category IN ('ebike', 'battery', 'parts', 'accessories', 'solar'));

-- 2. Insert or update the products
INSERT INTO products (
  name,
  slug,
  description,
  price,
  category,
  image_url,
  images,
  stock_quantity,
  is_featured,
  specs
)
VALUES
(
      'SUNSHINE 55W Germany Cell 12V Mono Solar Panel',
      'sunshine-55w-germany-cell-12v-mono-solar-panel',
      'SUNSHINE 55W Germany Cell 12V Mono Solar Panel – Overview
The 
SUNSHINE 55W Germany Cell 12V Mono Solar Panel
 is a compact and efficient solar module designed for small off-grid solar systems. Built with high-quality Germany cell technology and advanced MBB (Multi Busbar) design, this panel delivers stable energy output and dependable performance for battery charging and portable solar applications.
Its compact size makes it ideal for small solar installations such as lighting systems, backup solar setups, camping equipment, boats, caravans, and small home solar power solutions.
Key Benefits
Reliable 55W solar output for 12V battery systems.
Germany cell technology ensures stable power generation.
MBB design improves efficiency and reduces resistance.
Excellent performance in low-light conditions.
PID-free technology for long-term reliability.
Salt mist and ammonia resistant structure.
Compact and lightweight for easy installation.
25-year linear power output warranty.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and works efficiently with 
inverters
 and 
battery systems
 for dependable off-grid solar power generation.
Technical Specifications
Parameter
Value
Model
SS-55W-M
Maximum Power (Pmax)
55W
Maximum Power Voltage (Vmp)
18V
Maximum Power Current (Imp)
4.44A
Open Circuit Voltage (Voc)
21.06V
Short Circuit Current (Isc)
5.19A
Maximum System Voltage
1000V
Maximum Series Fuse
20A
Application
Class A
Power Tolerance
0 ~ +5W
Dimension
770 × 670 × 30 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      2400,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041520/solar_panels/SUNSHINE_55W_Germany_Cell_12V_Mono_Solar_Panel_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041520/solar_panels/SUNSHINE_55W_Germany_Cell_12V_Mono_Solar_Panel_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041521/solar_panels/SUNSHINE_55W_Germany_Cell_12V_Mono_Solar_Panel_1.png'],
      15,
      false,
      '{"Parameter":"Value","Model":"SS-55W-M","Maximum Power (Pmax)":"55W","Maximum Power Voltage (Vmp)":"18V","Maximum Power Current (Imp)":"4.44A","Open Circuit Voltage (Voc)":"21.06V","Short Circuit Current (Isc)":"5.19A","Maximum System Voltage":"1000V","Maximum Series Fuse":"20A","Application":"Class A","Power Tolerance":"0 ~ +5W","Dimension":"770 × 670 × 30 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'SUNSHINE 80W Germany Cell 12V Mono Solar Panel',
      'sunshine-80w-germany-cell-12v-mono-solar-panel',
      'SUNSHINE 80W Germany Cell 12V Mono Solar Panel – Overview
The 
SUNSHINE 80W Germany Cell 12V Mono Solar Panel
 is a compact and reliable solar module designed for small off-grid solar systems. Built using high-quality Germany cell technology and modern MBB (Multi Busbar) design, this solar panel delivers stable energy output and improved efficiency even in challenging environmental conditions.
This panel performs efficiently in low-light environments and provides dependable solar power for charging batteries in residential, mobile, and remote power systems.
Key Benefits
High efficiency 80W output for small solar systems.
Germany cell technology for stable energy generation.
MBB design improves power conversion efficiency.
Excellent performance in weak sunlight.
PID-free technology for long-term durability.
Salt mist and ammonia resistant structure.
Compact design suitable for limited spaces.
25-year linear power output warranty.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and works efficiently with 
inverters
 and 
battery systems
 for reliable off-grid solar energy solutions.
Technical Specifications
Parameter
Value
Model
SS-80W-M
Maximum Power (Pmax)
80W
Maximum Power Voltage (Vmp)
18V
Maximum Power Current (Imp)
4.44A
Open Circuit Voltage (Voc)
21.06V
Short Circuit Current (Isc)
5.19A
Maximum System Voltage
1000V
Maximum Series Fuse
20A
Application
Class A
Power Tolerance
0 ~ +5W
Dimension
770 × 670 × 30 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      6600,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041522/solar_panels/SUNSHINE_80W_Germany_Cell_12V_Mono_Solar_Panel_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041522/solar_panels/SUNSHINE_80W_Germany_Cell_12V_Mono_Solar_Panel_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041523/solar_panels/SUNSHINE_80W_Germany_Cell_12V_Mono_Solar_Panel_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041524/solar_panels/SUNSHINE_80W_Germany_Cell_12V_Mono_Solar_Panel_2.png'],
      15,
      false,
      '{"Parameter":"Value","Model":"SS-80W-M","Maximum Power (Pmax)":"80W","Maximum Power Voltage (Vmp)":"18V","Maximum Power Current (Imp)":"4.44A","Open Circuit Voltage (Voc)":"21.06V","Short Circuit Current (Isc)":"5.19A","Maximum System Voltage":"1000V","Maximum Series Fuse":"20A","Application":"Class A","Power Tolerance":"0 ~ +5W","Dimension":"770 × 670 × 30 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'SUNSHINE 220W Germany Cell 12V Mono Solar Panel',
      'sunshine-220w-germany-cell-12v-mono-solar-panel',
      'SUNSHINE 220W Germany Cell 12V Mono Solar Panel – Overview
The 
SUNSHINE 220W Germany Cell 12V Mono Solar Panel
 is a high-efficiency monocrystalline solar module designed for reliable off-grid solar applications. Built using advanced Germany cell technology and modern MBB design, this panel delivers excellent energy conversion, strong durability, and stable long-term performance even in demanding environmental conditions.
Key Benefits
Delivers up to 220W maximum power output for 12V solar systems.
High-efficiency monocrystalline Germany cell technology.
MBB design improves light absorption and reduces power loss.
Excellent low-light performance for cloudy conditions.
Salt mist and ammonia resistant for harsh environments.
PID-free technology ensures long-term stable power output.
Class A rated module for safe solar installations.
25-year linear power output warranty.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and operates efficiently with 
inverters
 and 
battery
 systems, ensuring maximum solar energy efficiency and dependable power generation.
Technical Specifications
Parameter
Value
Maximum Power (Pmax)
220W
Maximum Power Voltage (Vmp)
18.9V
Maximum Power Current (Imp)
11.64A
Open Circuit Voltage (Voc)
22.11V
Short Circuit Current (Isc)
13.52A
Maximum System Voltage
1000V
Maximum Series Fuse
20A
Application
Class A
Power Tolerance
0~+5W
Dimension
1570 × 710 × 35 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      6000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041508/solar_panels/SUNSHINE_220W_Germany_Cell_12V_Mono_Solar_Panel_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041508/solar_panels/SUNSHINE_220W_Germany_Cell_12V_Mono_Solar_Panel_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041509/solar_panels/SUNSHINE_220W_Germany_Cell_12V_Mono_Solar_Panel_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041510/solar_panels/SUNSHINE_220W_Germany_Cell_12V_Mono_Solar_Panel_2.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041511/solar_panels/SUNSHINE_220W_Germany_Cell_12V_Mono_Solar_Panel_3.png'],
      15,
      false,
      '{"Parameter":"Value","Maximum Power (Pmax)":"220W","Maximum Power Voltage (Vmp)":"18.9V","Maximum Power Current (Imp)":"11.64A","Open Circuit Voltage (Voc)":"22.11V","Short Circuit Current (Isc)":"13.52A","Maximum System Voltage":"1000V","Maximum Series Fuse":"20A","Application":"Class A","Power Tolerance":"0~+5W","Dimension":"1570 × 710 × 35 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'SUNSHINE 200W Germany Cell 12V Mono Solar Panel',
      'sunshine-200w-germany-cell-12v-mono-solar-panel',
      'SUNSHINE 200W Germany Cell 12V Mono Solar Panel – Overview
The 
SUNSHINE 200W Germany Cell 12V Mono Solar Panel
 is a high-performance monocrystalline solar module engineered for dependable off-grid solar applications. Built using advanced Germany cell technology and MBB design, this solar panel delivers strong energy output, superior durability, and reliable long-term performance even in challenging environmental conditions.
Key Benefits
Delivers up to 200W maximum power output ideal for 12V solar systems.
High-efficiency monocrystalline Germany cell technology.
MBB design improves light absorption and reduces internal power loss.
Excellent performance even in low-light conditions.
Salt mist and ammonia resistant for harsh environments.
PID-free technology for long-term power stability.
Class A safety rating for reliable solar installations.
25-year linear power output warranty for long service life.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and works efficiently with 
inverters
 and 
battery
 systems, ensuring optimal solar energy performance and dependable power generation.
Technical Specifications
Parameter
Value
Maximum Power (Pmax)
200W
Maximum Power Voltage (Vmp)
18.9V
Maximum Power Current (Imp)
10.58A
Open Circuit Voltage (Voc)
22.11V
Short Circuit Current (Isc)
12.38A
Maximum System Voltage
1500V
Maximum Series Fuse
25A
Application
Class A
Power Tolerance
0~+5W
Dimension
1480 × 670 × 30 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      5100,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041501/solar_panels/SUNSHINE_200W_Germany_Cell_12V_Mono_Solar_Panel_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041501/solar_panels/SUNSHINE_200W_Germany_Cell_12V_Mono_Solar_Panel_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041502/solar_panels/SUNSHINE_200W_Germany_Cell_12V_Mono_Solar_Panel_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041503/solar_panels/SUNSHINE_200W_Germany_Cell_12V_Mono_Solar_Panel_2.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041504/solar_panels/SUNSHINE_200W_Germany_Cell_12V_Mono_Solar_Panel_3.png'],
      15,
      false,
      '{"Parameter":"Value","Maximum Power (Pmax)":"200W","Maximum Power Voltage (Vmp)":"18.9V","Maximum Power Current (Imp)":"10.58A","Open Circuit Voltage (Voc)":"22.11V","Short Circuit Current (Isc)":"12.38A","Maximum System Voltage":"1500V","Maximum Series Fuse":"25A","Application":"Class A","Power Tolerance":"0~+5W","Dimension":"1480 × 670 × 30 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'SUNSHINE 170W Germany Cell 12V Mono Solar Panel',
      'sunshine-170w-germany-cell-12v-mono-solar-panel',
      'SUNSHINE 170W Germany Cell 12V Mono Solar Panel – Overview
The 
SUNSHINE 170W Germany Cell 12V Mono Solar Panel
 is a high-efficiency monocrystalline solar module designed for dependable off-grid solar applications. Built with advanced Germany cell technology and MBB design, this panel ensures strong power output, enhanced durability, and reliable long-term performance even under challenging environmental conditions.
Key Benefits
Delivers up to 170W maximum power output ideal for 12V solar systems.
High-efficiency monocrystalline Germany cell technology.
MBB design improves light absorption and minimizes internal power loss.
Excellent low-light performance in cloudy or weak sunlight.
Salt mist and ammonia resistant for harsh environmental conditions.
PID-free technology for stable and long-lasting performance.
Class A safety rating for reliable solar installations.
25-year linear power output warranty for long-term reliability.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and operates efficiently with 
inverters
 and 
battery
 systems, ensuring optimal solar energy performance and dependable power generation.
Technical Specifications
Parameter
Value
Maximum Power (Pmax)
170W
Maximum Power Voltage (Vmp)
18.9V
Maximum Power Current (Imp)
8.99A
Open Circuit Voltage (Voc)
22.11V
Short Circuit Current (Isc)
10.52A
Maximum System Voltage
1000V
Maximum Series Fuse
20A
Application
Class A
Power Tolerance
0~+5W
Dimension
1480 × 570 × 35 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      4500,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041494/solar_panels/SUNSHINE_170W_Germany_Cell_12V_Mono_Solar_Panel_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041494/solar_panels/SUNSHINE_170W_Germany_Cell_12V_Mono_Solar_Panel_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041495/solar_panels/SUNSHINE_170W_Germany_Cell_12V_Mono_Solar_Panel_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041496/solar_panels/SUNSHINE_170W_Germany_Cell_12V_Mono_Solar_Panel_2.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041497/solar_panels/SUNSHINE_170W_Germany_Cell_12V_Mono_Solar_Panel_3.png'],
      15,
      false,
      '{"Parameter":"Value","Maximum Power (Pmax)":"170W","Maximum Power Voltage (Vmp)":"18.9V","Maximum Power Current (Imp)":"8.99A","Open Circuit Voltage (Voc)":"22.11V","Short Circuit Current (Isc)":"10.52A","Maximum System Voltage":"1000V","Maximum Series Fuse":"20A","Application":"Class A","Power Tolerance":"0~+5W","Dimension":"1480 × 570 × 35 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'SUNSHINE 150W Germany Cell 12V Mono Solar Panel',
      'sunshine-150w-germany-cell-12v-mono-solar-panel',
      'SUNSHINE 150W Germany Cell 12V Mono Solar Panel – Overview
The 
SUNSHINE 150W Germany Cell 12V Mono Solar Panel
 is a high-performance monocrystalline solar module designed for reliable off-grid solar applications. Built using advanced Germany cell technology and MBB design, this panel provides excellent power output, enhanced durability, and stable long-term performance even in demanding environmental conditions.
Key Benefits
Produces up to 150W maximum power output for 12V solar systems.
High-efficiency monocrystalline Germany cell technology.
MBB design improves light absorption and reduces power loss.
Excellent performance in low-light conditions.
Salt mist and ammonia resistant for harsh environments.
PID-free technology ensures long-term power stability.
Class A safety rating for reliable solar installations.
25-year linear power output warranty.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and operates efficiently with 
inverters
 and 
battery
 systems, ensuring optimal solar energy performance and dependable power output.
Technical Specifications
Parameter
Value
Maximum Power (Pmax)
150W
Maximum Power Voltage (Vmp)
18V
Maximum Power Current (Imp)
8.33A
Open Circuit Voltage (Voc)
21.06V
Short Circuit Current (Isc)
9.75A
Maximum System Voltage
1500V
Maximum Series Fuse
25A
Application
Class A
Power Tolerance
0~+5W
Dimension
1200 × 580 × 30 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      3000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041489/solar_panels/SUNSHINE_150W_Germany_Cell_12V_Mono_Solar_Panel_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041489/solar_panels/SUNSHINE_150W_Germany_Cell_12V_Mono_Solar_Panel_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041491/solar_panels/SUNSHINE_150W_Germany_Cell_12V_Mono_Solar_Panel_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041492/solar_panels/SUNSHINE_150W_Germany_Cell_12V_Mono_Solar_Panel_2.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041493/solar_panels/SUNSHINE_150W_Germany_Cell_12V_Mono_Solar_Panel_3.png'],
      15,
      false,
      '{"Parameter":"Value","Maximum Power (Pmax)":"150W","Maximum Power Voltage (Vmp)":"18V","Maximum Power Current (Imp)":"8.33A","Open Circuit Voltage (Voc)":"21.06V","Short Circuit Current (Isc)":"9.75A","Maximum System Voltage":"1500V","Maximum Series Fuse":"25A","Application":"Class A","Power Tolerance":"0~+5W","Dimension":"1200 × 580 × 30 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'SUNSHINE 100W Germany Cell 12V Mono Solar Panel',
      'sunshine-100w-germany-cell-12v-mono-solar-panel',
      'SUNSHINE 100W Germany Cell 12V Mono Solar Panel – Overview
The SUNSHINE 100W Germany Cell 12V Mono Solar Panel is a high-efficiency monocrystalline solar module engineered for dependable off-grid energy applications. Built using advanced Germany cell technology and modern MBB design, this panel delivers stable power output, improved durability, and long-lasting performance even in harsh environmental conditions.
Key Benefits
Produces up to 100W output ideal for 12V solar systems.
Monocrystalline Germany cell technology for higher efficiency.
MBB design enhances light absorption and reduces internal loss.
Excellent low-light performance for cloudy or weak sunlight.
Salt mist and ammonia resistant for extreme environments.
PID-free technology ensures long-term performance reliability.
Class A safety standard for secure solar installations.
25-year linear power warranty for long service life.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and operates efficiently with 
inverters
 and 
battery
 systems, ensuring optimal solar energy performance and reliable power output.
Technical Specifications
Parameter
Value
Maximum Power (Pmax)
100W
Maximum Power Voltage (Vmp)
18V
Maximum Power Current (Imp)
5.55A
Open Circuit Voltage (Voc)
21.06V
Short Circuit Current (Isc)
6.49A
Maximum System Voltage
1500V
Maximum Series Fuse
25A
Application
Class A
Power Tolerance
0 ~ +5W
Dimension
1000 × 600 × 30 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041482/solar_panels/SUNSHINE_100W_Germany_Cell_12V_Mono_Solar_Panel_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041482/solar_panels/SUNSHINE_100W_Germany_Cell_12V_Mono_Solar_Panel_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041483/solar_panels/SUNSHINE_100W_Germany_Cell_12V_Mono_Solar_Panel_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041484/solar_panels/SUNSHINE_100W_Germany_Cell_12V_Mono_Solar_Panel_2.png'],
      15,
      false,
      '{"Parameter":"Value","Maximum Power (Pmax)":"100W","Maximum Power Voltage (Vmp)":"18V","Maximum Power Current (Imp)":"5.55A","Open Circuit Voltage (Voc)":"21.06V","Short Circuit Current (Isc)":"6.49A","Maximum System Voltage":"1500V","Maximum Series Fuse":"25A","Application":"Class A","Power Tolerance":"0 ~ +5W","Dimension":"1000 × 600 × 30 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'JA Solar Deep Blue 4.0 Pro 615W Bifacial Solar Panel',
      'ja-solar-deep-blue-40-pro-615w-bifacial-solar-panel',
      'JA Solar Deep Blue 4.0 Pro 615W Bifacial Solar Panel – Overview
The JA Solar Deep Blue 4.0 Pro 615W Bifacial Solar Panel is a premium n-type double glass bifacial module engineered for high-efficiency commercial and utility-scale solar installations. Built with advanced MBB half-cell technology, this 620W solar panel delivers superior energy yield, enhanced durability, and long-term reliability under demanding environmental conditions.
Key Benefits
Advanced n-type cell technology ensures lower degradation and higher lifetime energy output.
Double glass bifacial structure increases rear-side gain for higher total power generation.
Up to 22.8% module efficiency maximizes power density in limited installation areas.
Excellent temperature coefficient provides stable performance in hot climates.
Strong mechanical load capacity supports heavy wind and snow conditions.
1500V DC system compatibility reduces BOS cost in large-scale projects.
Improved low-irradiance response enhances performance during cloudy weather.
Backed by 12-year product warranty and 30-year linear power output warranty.
TThis panel integrates effortlessly with 
MPPT/PWM charge controllers
 and works perfectly with 
Off-Grid inverters
, 
On-Grid inverters
, and 
Hybrid inverters
, ensuring maximum solar energy efficiency and reliable performance.
Technical Specifications
Parameter
Value
Rated Maximum Power (Pmax)
615W
Open Circuit Voltage (Voc)
48.30V
Maximum Power Voltage (Vmp)
39.96V
Short Circuit Current (Isc)
16.10A
Maximum Power Current (Imp)
15.39A
Module Efficiency
22.8%
Maximum System Voltage
1500V DC
Operating Temperature
-40°C to +85°C
Dimensions
2382 × 1134 × 30 mm
Weight
33.1 kg
Bifaciality
80% ±5%
Cell Type
n-type Mono
Number of Cells
132 (6×22)
Download Datasheet
 | For manufacturer details, see the official page: 
JA Solar Deep Blue 4.0 Pro JAM66D45-615 LB',
      1760,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041471/solar_panels/JA_Solar_Deep_Blue_4_0_Pro_615W_Bifacial_Solar_Pan_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041471/solar_panels/JA_Solar_Deep_Blue_4_0_Pro_615W_Bifacial_Solar_Pan_0.png'],
      15,
      false,
      '{"Parameter":"Value","Rated Maximum Power (Pmax)":"615W","Open Circuit Voltage (Voc)":"48.30V","Maximum Power Voltage (Vmp)":"39.96V","Short Circuit Current (Isc)":"16.10A","Maximum Power Current (Imp)":"15.39A","Module Efficiency":"22.8%","Maximum System Voltage":"1500V DC","Operating Temperature":"-40°C to +85°C","Dimensions":"2382 × 1134 × 30 mm","Weight":"33.1 kg","Bifaciality":"80% ±5%","Cell Type":"n-type Mono","Number of Cells":"132 (6×22)","Subcategory":"bifacial"}'::jsonb
    ),
(
      'REC Alpha Pro M 600W Heterojunction Mono Solar Panel',
      'rec-alpha-pro-m-600w-heterojunction-mono-solar-panel',
      'REC Alpha Pro M 600W Heterojunction Mono Solar Panel – Overview
The REC Alpha Pro M 600W Heterojunction Mono Solar Panel is a next-generation high-efficiency module built with advanced heterojunction (HJT) technology. Designed for commercial, industrial, and utility-scale installations, this powerful 600W panel delivers superior energy yield, excellent low-light performance, and exceptional long-term reliability.
Key Benefits
Advanced heterojunction cell technology improves overall energy conversion efficiency.
High power output of 600W reduces installation costs per watt.
Up to 21.1% module efficiency maximizes energy generation.
Outstanding temperature coefficient (-0.24%/°C) ensures better performance in hot climates.
>92% guaranteed power output in year 25 with only 0.25% annual degradation.
1500V system compatibility supports large-scale solar projects.
Strong anodized aluminum frame with high mechanical load resistance.
Backed by REC 25-year ProTrust warranty program.
This high-performance module integrates seamlessly with modern solar panels system designs and can be paired with a dependable 
battery bank
 solution for hybrid and energy storage applications.
Technical Specifications
Parameter
Value
Rated Maximum Power (Pmax)
600W
Nominal Power Voltage (Vmp)
36.0V
Nominal Power Current (Imp)
16.67A
Open Circuit Voltage (Voc)
44.2V
Short Circuit Current (Isc)
17.65A
Module Efficiency
21.1%
Maximum System Voltage
1500V
Operating Temperature
-40°C to +85°C
Dimensions
2175 × 1305 × 30 mm
Weight
32.5 kg
Cell Type
120 Half-cut REC Heterojunction Cells
Origin
Made in Singapore
Download Datasheet
 | For manufacturer details, see the official page: 
REC Alpha Pro M',
      1760,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041478/solar_panels/REC_Alpha_Pro_M_600W_Heterojunction_Mono_Solar_Pan_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041478/solar_panels/REC_Alpha_Pro_M_600W_Heterojunction_Mono_Solar_Pan_0.png'],
      15,
      false,
      '{"Parameter":"Value","Rated Maximum Power (Pmax)":"600W","Nominal Power Voltage (Vmp)":"36.0V","Nominal Power Current (Imp)":"16.67A","Open Circuit Voltage (Voc)":"44.2V","Short Circuit Current (Isc)":"17.65A","Module Efficiency":"21.1%","Maximum System Voltage":"1500V","Operating Temperature":"-40°C to +85°C","Dimensions":"2175 × 1305 × 30 mm","Weight":"32.5 kg","Cell Type":"120 Half-cut REC Heterojunction Cells","Origin":"Made in Singapore","Subcategory":"hjt"}'::jsonb
    ),
(
      'SUNSHINE 250W Germany Cell 24V Mono Solar Panel',
      'sunshine-250w-germany-cell-24v-mono-solar-panel',
      'SUNSHINE 250W Germany Cell 24V Mono  Solar Panel – Overview
The 
SUNSHINE 250W Germany Cell 24V Mono  Solar Panel
 is a high-efficiency solar module designed for modern off-grid solar systems. Built with advanced Germany cell technology and bifacial power generation capability, this panel can capture sunlight from both the front and rear sides to maximize energy production.
The panel features modern MBB (Multi-Busbar) design to improve electrical performance, reduce resistance losses, and increase overall efficiency. With PID-free technology and robust environmental resistance, the SUNSHINE bifacial solar panel provides reliable power output and long-term durability in various installation environments.
Key Benefits
High-efficiency 250W solar power output for 24V systems.
Bifacial solar technology captures light from both sides.
Germany cell technology for superior efficiency.
MBB design improves electrical performance.
Excellent low-light performance in cloudy conditions.
Salt mist and ammonia resistant for harsh environments.
PID-free technology ensures long-term stability.
25-year linear power output warranty.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and works efficiently with 
inverters
 and 
battery
 systems to deliver reliable solar power for residential and off-grid installations.
Technical Specifications
Parameter
Value
Model
SS-250W-24-M
Maximum Power (Pmax)
250W
Maximum Power Voltage (Vmp)
31.5V
Maximum Power Current (Imp)
7.93A
Open Circuit Voltage (Voc)
36.85V
Short Circuit Current (Isc)
9.28A
Maximum System Voltage
1000V
Maximum Series Fuse
20A
Application
Class A
Power Tolerance
0~+5W
Dimension
1600 × 920 × 35 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      1760,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041512/solar_panels/SUNSHINE_250W_Germany_Cell_24V_Mono_Solar_Panel_0.webp',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041512/solar_panels/SUNSHINE_250W_Germany_Cell_24V_Mono_Solar_Panel_0.webp', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041513/solar_panels/SUNSHINE_250W_Germany_Cell_24V_Mono_Solar_Panel_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041514/solar_panels/SUNSHINE_250W_Germany_Cell_24V_Mono_Solar_Panel_2.webp', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041514/solar_panels/SUNSHINE_250W_Germany_Cell_24V_Mono_Solar_Panel_3.jpg'],
      15,
      false,
      '{"Parameter":"Value","Model":"SS-250W-24-M","Maximum Power (Pmax)":"250W","Maximum Power Voltage (Vmp)":"31.5V","Maximum Power Current (Imp)":"7.93A","Open Circuit Voltage (Voc)":"36.85V","Short Circuit Current (Isc)":"9.28A","Maximum System Voltage":"1000V","Maximum Series Fuse":"20A","Application":"Class A","Power Tolerance":"0~+5W","Dimension":"1600 × 920 × 35 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'SUNSHINE 300W Germany Cell 12V Mono Bifacial Solar Panel',
      'sunshine-300w-germany-cell-12v-mono-bifacial-solar-panel',
      'SUNSHINE 300W Germany Cell 12V Mono Bifacial Solar Panel – Overview
The 
SUNSHINE 300W Germany Cell 12V Mono Bifacial Solar Panel
 is a high-performance solar module engineered for reliable off-grid solar power systems. Designed with advanced Germany cell technology and bifacial energy generation capability, this panel can capture sunlight from both the front and rear surfaces to maximize solar power production.
Featuring modern MBB (Multi Busbar) design and PID-free technology, the SUNSHINE solar panel delivers higher conversion efficiency, improved durability, and long-term stable power output even in challenging environmental conditions.
Key Benefits
High-efficiency 300W output for 12V solar power systems.
Bifacial solar technology increases total energy generation.
Germany cell technology ensures superior efficiency.
MBB design improves power output and reduces energy loss.
Excellent low-light performance during cloudy weather.
Salt mist and ammonia resistant for harsh environments.
PID-free technology ensures long-term reliability.
25-year linear power output warranty.
This solar panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and works efficiently with 
inverters
 and 
battery systems
 for dependable off-grid solar power generation.
Technical Specifications
Parameter
Value
Model
SS-300W-M-B
Maximum Power (Pmax)
300W
Maximum Power Voltage (Vmp)
21.04V
Maximum Power Current (Imp)
14.26A
Open Circuit Voltage (Voc)
24.62V
Short Circuit Current (Isc)
16.68A
Maximum System Voltage
1000V
Maximum Series Fuse
20A
Application
Class A
Power Tolerance
0 ~ +5W
Dimension
1720 × 760 × 35 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      6600,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041515/solar_panels/SUNSHINE_300W_Germany_Cell_12V_Mono_Bifacial_Solar_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041515/solar_panels/SUNSHINE_300W_Germany_Cell_12V_Mono_Bifacial_Solar_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041517/solar_panels/SUNSHINE_300W_Germany_Cell_12V_Mono_Bifacial_Solar_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041518/solar_panels/SUNSHINE_300W_Germany_Cell_12V_Mono_Bifacial_Solar_2.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041519/solar_panels/SUNSHINE_300W_Germany_Cell_12V_Mono_Bifacial_Solar_3.png'],
      15,
      false,
      '{"Parameter":"Value","Model":"SS-300W-M-B","Maximum Power (Pmax)":"300W","Maximum Power Voltage (Vmp)":"21.04V","Maximum Power Current (Imp)":"14.26A","Open Circuit Voltage (Voc)":"24.62V","Short Circuit Current (Isc)":"16.68A","Maximum System Voltage":"1000V","Maximum Series Fuse":"20A","Application":"Class A","Power Tolerance":"0 ~ +5W","Dimension":"1720 × 760 × 35 mm","Subcategory":"bifacial"}'::jsonb
    ),
(
      'SUNSHINE 220W Germany Cell 12V Mono Bifacial Solar Panel',
      'sunshine-220w-germany-cell-12v-mono-bifacial-solar-panel',
      'SUNSHINE 220W Germany Cell 12V Mono Bifacial Solar Panel – Overview
The 
SUNSHINE 220W Germany Cell 12V Mono Bifacial Solar Panel
 is a high-efficiency solar module designed for modern off-grid solar systems. Built with advanced Germany cell technology and bifacial power generation capability, this panel can capture sunlight from both the front and rear sides to maximize energy production.
The panel features modern MBB (Multi-Busbar) design to improve electrical performance, reduce resistance losses, and increase overall efficiency. With PID-free technology and robust environmental resistance, the SUNSHINE bifacial solar panel provides reliable power output and long-term durability in various installation environments.
Key Benefits
High-efficiency 220W solar power output for 12V systems.
Bifacial solar technology captures light from both sides.
Germany cell technology for superior efficiency.
MBB design improves electrical performance.
Excellent low-light performance in cloudy conditions.
Salt mist and ammonia resistant for harsh environments.
PID-free technology ensures long-term stability.
25-year linear power output warranty.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and works efficiently with 
inverters
 and 
battery
 systems to deliver reliable solar power for residential and off-grid installations.
Technical Specifications
Parameter
Value
Model
SS-220W-M-B
Maximum Power (Pmax)
220W
Maximum Power Voltage (Vmp)
18.9V
Maximum Power Current (Imp)
11.64A
Open Circuit Voltage (Voc)
22.11V
Short Circuit Current (Isc)
13.62A
Maximum System Voltage
1000V
Maximum Series Fuse
20A
Application
Class A
Power Tolerance
0~+5W
Dimension
1570 × 710 × 35 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      6600,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041505/solar_panels/SUNSHINE_220W_Germany_Cell_12V_Mono_Bifacial_Solar_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041505/solar_panels/SUNSHINE_220W_Germany_Cell_12V_Mono_Bifacial_Solar_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041506/solar_panels/SUNSHINE_220W_Germany_Cell_12V_Mono_Bifacial_Solar_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041507/solar_panels/SUNSHINE_220W_Germany_Cell_12V_Mono_Bifacial_Solar_2.png'],
      15,
      false,
      '{"Parameter":"Value","Model":"SS-220W-M-B","Maximum Power (Pmax)":"220W","Maximum Power Voltage (Vmp)":"18.9V","Maximum Power Current (Imp)":"11.64A","Open Circuit Voltage (Voc)":"22.11V","Short Circuit Current (Isc)":"13.62A","Maximum System Voltage":"1000V","Maximum Series Fuse":"20A","Application":"Class A","Power Tolerance":"0~+5W","Dimension":"1570 × 710 × 35 mm","Subcategory":"bifacial"}'::jsonb
    ),
(
      'SUNSHINE 200W Germany Cell 12V Mono Bifacial Solar Panel',
      'sunshine-200w-germany-cell-12v-mono-bifacial-solar-panel',
      'SUNSHINE 200W Germany Cell 12V Mono Bifacial Solar Panel – Overview
The 
SUNSHINE 200W Germany Cell 12V Mono Bifacial Solar Panel
 is a high-efficiency solar module designed for advanced off-grid solar systems. Built with premium Germany cell technology and bifacial energy generation capability, this panel captures sunlight from both the front and rear sides to increase overall energy production.
Featuring modern MBB (Multi Busbar) design and PID-free technology, the SUNSHINE PRO series provides higher efficiency, stronger durability, and stable long-term power generation even in harsh environmental conditions.
Key Benefits
High-efficiency 200W power output for 12V solar systems.
Bifacial solar technology captures light from both sides.
Germany cell technology ensures superior energy conversion.
MBB design reduces resistance and increases efficiency.
Excellent performance in low-light conditions.
Salt mist and ammonia resistant for harsh environments.
PID-free technology ensures long-term reliability.
25-year linear power output warranty.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and operates efficiently with 
inverters
 and 
battery
 systems for stable solar power generation.
Technical Specifications
Parameter
Value
Model
SS-PRO-200W-M-B
Maximum Power (Pmax)
200W
Maximum Power Voltage (Vmp)
18V
Maximum Power Current (Imp)
11.11A
Open Circuit Voltage (Voc)
21.06V
Short Circuit Current (Isc)
13A
Maximum System Voltage
1500V
Maximum Series Fuse
25A
Application
Class A
Power Tolerance
0 ~ +5W
Dimension
1330 × 760 × 30 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      6600,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041498/solar_panels/SUNSHINE_200W_Germany_Cell_12V_Mono_Bifacial_Solar_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041498/solar_panels/SUNSHINE_200W_Germany_Cell_12V_Mono_Bifacial_Solar_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041499/solar_panels/SUNSHINE_200W_Germany_Cell_12V_Mono_Bifacial_Solar_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041500/solar_panels/SUNSHINE_200W_Germany_Cell_12V_Mono_Bifacial_Solar_2.png'],
      15,
      false,
      '{"Parameter":"Value","Model":"SS-PRO-200W-M-B","Maximum Power (Pmax)":"200W","Maximum Power Voltage (Vmp)":"18V","Maximum Power Current (Imp)":"11.11A","Open Circuit Voltage (Voc)":"21.06V","Short Circuit Current (Isc)":"13A","Maximum System Voltage":"1500V","Maximum Series Fuse":"25A","Application":"Class A","Power Tolerance":"0 ~ +5W","Dimension":"1330 × 760 × 30 mm","Subcategory":"bifacial"}'::jsonb
    ),
(
      'SUNSHINE 130W Germany Cell 12V Mono Solar Panel',
      'sunshine-130w-germany-cell-12v-mono-solar-panel',
      'SUNSHINE 130W Germany Cell 12V Mono Solar Panel – Overview
The SUNSHINE 130W Germany Cell 12V Mono Solar Panel is a high-efficiency monocrystalline solar module engineered for reliable off-grid solar applications. Designed using advanced Germany cell technology and modern MBB design, this panel provides stable power output, excellent durability, and long-term energy performance even under demanding environmental conditions.
Key Benefits
Produces up to 130W power output ideal for 12V solar systems.
Monocrystalline Germany cell technology ensures higher efficiency.
MBB design improves light absorption and reduces internal loss.
Excellent low-light performance in cloudy or weak sunlight.
Salt mist and ammonia resistant for harsh environments.
PID-free technology for long-term stable power generation.
Class A application rated for safety and reliability.
25-year linear power output warranty for long service life.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and operates efficiently with 
inverters
 and 
battery
 systems, ensuring optimal solar energy performance and reliable power output.
Technical Specifications
Parameter
Value
Maximum Power (Pmax)
130W
Maximum Power Voltage (Vmp)
18V
Maximum Power Current (Imp)
7.22A
Open Circuit Voltage (Voc)
21.06V
Short Circuit Current (Isc)
8.45A
Maximum System Voltage
1000V
Maximum Series Fuse
20A
Application
Class A
Power Tolerance
0~+5W
Dimension
1200 × 670 × 30 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      3000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041485/solar_panels/SUNSHINE_130W_Germany_Cell_12V_Mono_Solar_Panel_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041485/solar_panels/SUNSHINE_130W_Germany_Cell_12V_Mono_Solar_Panel_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041486/solar_panels/SUNSHINE_130W_Germany_Cell_12V_Mono_Solar_Panel_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041487/solar_panels/SUNSHINE_130W_Germany_Cell_12V_Mono_Solar_Panel_2.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041488/solar_panels/SUNSHINE_130W_Germany_Cell_12V_Mono_Solar_Panel_3.png'],
      15,
      false,
      '{"Parameter":"Value","Maximum Power (Pmax)":"130W","Maximum Power Voltage (Vmp)":"18V","Maximum Power Current (Imp)":"7.22A","Open Circuit Voltage (Voc)":"21.06V","Short Circuit Current (Isc)":"8.45A","Maximum System Voltage":"1000V","Maximum Series Fuse":"20A","Application":"Class A","Power Tolerance":"0~+5W","Dimension":"1200 × 670 × 30 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'SUNSHINE 85W Germany Cell 12V Mono Solar Panel',
      'sunshine-85w-germany-cell-12v-mono-solar-panel',
      'SUNSHINE 85W Germany Cell 12V Mono Solar Panel – Overview
The SUNSHINE 85W Germany Cell 12V Mono Solar Panel is a high-efficiency monocrystalline solar module designed for reliable off-grid applications. Built with advanced Germany cell technology and MBB design, this panel ensures superior power output, durability, and long-term performance even in challenging environmental conditions.
Key Benefits
Delivers 85W maximum power output ideal for 12V battery systems.
Monocrystalline Germany cell technology ensures higher efficiency.
MBB design improves light absorption and reduces power loss.
Excellent low-light performance for cloudy and weak sunlight.
Salt mist and ammonia resistant for harsh environments.
PID-free technology enhances long-term power stability.
Class A application rated for safety and reliability.
25 years linear power output warranty for long service life.
This panel integrates seamlessly with MPPT and PWM 
solar charge controllers
 and operates efficiently with 
inverters
 and 
battery
 systems, ensuring optimal solar energy performance and reliable power output.
Technical Specifications
Parameter
Value
Maximum Power (Pmax)
85W
Maximum Power Voltage (Vmp)
18V
Maximum Power Current (Imp)
4.72A
Open Circuit Voltage (Voc)
21.06V
Short Circuit Current (Isc)
5.52A
Maximum System Voltage
1000V
Maximum Series Fuse
20A
Application Class
Class A
Power Tolerance
0~+5W
Dimension
730 × 575 × 25 mm
নোটঃ SUNSHINE প্যানেল গুলো ট্রান্সপোর্টে গ্লাস ভেঙ্গে গেলে আমরা নতুন একটা প্যানেল দিবো। যদি গ্লাস না ভাঙ্গে, শুধু স্ক্রাচ (দাগ ) বা ফ্রেমে কোন ক্ষতি হয় তাহলে রিটার্ন / রিফান্ড হবে না।',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041525/solar_panels/SUNSHINE_85W_Germany_Cell_12V_Mono_Solar_Panel_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041525/solar_panels/SUNSHINE_85W_Germany_Cell_12V_Mono_Solar_Panel_0.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041527/solar_panels/SUNSHINE_85W_Germany_Cell_12V_Mono_Solar_Panel_1.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041527/solar_panels/SUNSHINE_85W_Germany_Cell_12V_Mono_Solar_Panel_2.png', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041528/solar_panels/SUNSHINE_85W_Germany_Cell_12V_Mono_Solar_Panel_3.png'],
      15,
      false,
      '{"Parameter":"Value","Maximum Power (Pmax)":"85W","Maximum Power Voltage (Vmp)":"18V","Maximum Power Current (Imp)":"4.72A","Open Circuit Voltage (Voc)":"21.06V","Short Circuit Current (Isc)":"5.52A","Maximum System Voltage":"1000V","Maximum Series Fuse":"20A","Application Class":"Class A","Power Tolerance":"0~+5W","Dimension":"730 × 575 × 25 mm","Subcategory":"mono"}'::jsonb
    ),
(
      'REC Alpha Pro M 610W Heterojunction Mono Solar Panel',
      'rec-alpha-pro-m-610w-heterojunction-mono-solar-panel',
      'REC Alpha Pro M 610W Heterojunction Mono Solar Panel – Overview
The REC Alpha Pro M 610W Heterojunction Mono Solar Panel is a next-generation high-efficiency module built with advanced heterojunction (HJT) technology. Designed for commercial, industrial, and utility-scale installations, this powerful 610W panel delivers superior energy yield, excellent low-light performance, and exceptional long-term reliability.
Key Benefits
Advanced heterojunction cell technology improves overall energy conversion efficiency.
High power output of 610W reduces installation costs per watt.
Up to 21.5% module efficiency maximizes energy generation.
Outstanding temperature coefficient (-0.24%/°C) ensures better performance in hot climates.
>92% guaranteed power output in year 25 with only 0.25% annual degradation.
1500V system compatibility supports large-scale solar projects.
Strong anodized aluminum frame with high mechanical load resistance.
Backed by REC 25-year ProTrust warranty program.
This high-performance module integrates seamlessly with modern solar panels system designs and can be paired with a dependable 
battery bank
 solution for hybrid and energy storage applications.
Technical Specifications
Parameter
Value
Rated Maximum Power (Pmax)
610W
Nominal Power Voltage (Vmp)
36.3V
Nominal Power Current (Imp)
16.81A
Open Circuit Voltage (Voc)
44.3V
Short Circuit Current (Isc)
17.72A
Module Efficiency
21.5%
Maximum System Voltage
1500V
Operating Temperature
-40°C to +85°C
Dimensions
2175 × 1305 × 30 mm
Weight
32.5 kg
Cell Type
120 Half-cut REC Heterojunction Cells
Origin
Made in Singapore
Download Datasheet
 | For manufacturer details, see the official page: 
REC Alpha Pro M',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041479/solar_panels/REC_Alpha_Pro_M_610W_Heterojunction_Mono_Solar_Pan_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041479/solar_panels/REC_Alpha_Pro_M_610W_Heterojunction_Mono_Solar_Pan_0.png'],
      15,
      false,
      '{"Parameter":"Value","Rated Maximum Power (Pmax)":"610W","Nominal Power Voltage (Vmp)":"36.3V","Nominal Power Current (Imp)":"16.81A","Open Circuit Voltage (Voc)":"44.3V","Short Circuit Current (Isc)":"17.72A","Module Efficiency":"21.5%","Maximum System Voltage":"1500V","Operating Temperature":"-40°C to +85°C","Dimensions":"2175 × 1305 × 30 mm","Weight":"32.5 kg","Cell Type":"120 Half-cut REC Heterojunction Cells","Origin":"Made in Singapore","Subcategory":"hjt"}'::jsonb
    ),
(
      'REC TwinPeak 4 Black Series 365W Half-Cut Mono Solar Panel',
      'rec-twinpeak-4-black-series-365w-half-cut-mono-solar-panel',
      'REC TwinPeak 4 Black Series 365W Half-Cut Mono Solar Panel – Overview
The REC TwinPeak 4 Black Series 365W Half-Cut Mono Solar Panel is a premium European-engineered full-black solar module designed for residential and commercial rooftop installations. Manufactured in Singapore, this module features REC’s pioneering twin design with 120 half-cut mono cells to deliver higher efficiency, reduced internal losses, and long-term reliable performance.
Key Benefits
120 half-cut mono cells improve energy yield and reduce power losses.
Up to 20.0% module efficiency maximizes rooftop space utilization.
100% PID-free technology ensures long-term performance stability.
Super-strong anodized aluminum frame supports high wind and snow loads.
Excellent temperature coefficient (-0.34%/°C) minimizes heat-related losses.
High low-light performance improves morning and cloudy-day output.
Premium full black aesthetic design enhances rooftop appearance.
Backed by 25-year ProTrust performance warranty.
This premium module integrates seamlessly with modern solar panels systems and can be paired with a reliable 
battery bank
 for hybrid or backup-ready solar solutions.
Technical Specifications
Parameter
Value
Rated Maximum Power (Pmax)
365W
Nominal Power Voltage (Vmp)
34.3V
Nominal Power Current (Imp)
10.65A
Open Circuit Voltage (Voc)
40.8V
Short Circuit Current (Isc)
11.32A
Module Efficiency
20.0%
Maximum System Voltage
1000V
Operating Temperature
-40°C to +85°C
Dimensions
1755 × 1040 × 30 mm
Weight
20.0 kg
Cell Type
120 Half-cut Mono Cells
Origin
Made in Singapore
Download Datasheet
 | For manufacturer details, see the official page: 
REC TwinPeak 4 Black Series',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041480/solar_panels/REC_TwinPeak_4_Black_Series_365W_Half_Cut_Mono_Sol_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041480/solar_panels/REC_TwinPeak_4_Black_Series_365W_Half_Cut_Mono_Sol_0.png'],
      15,
      false,
      '{"Parameter":"Value","Rated Maximum Power (Pmax)":"365W","Nominal Power Voltage (Vmp)":"34.3V","Nominal Power Current (Imp)":"10.65A","Open Circuit Voltage (Voc)":"40.8V","Short Circuit Current (Isc)":"11.32A","Module Efficiency":"20.0%","Maximum System Voltage":"1000V","Operating Temperature":"-40°C to +85°C","Dimensions":"1755 × 1040 × 30 mm","Weight":"20.0 kg","Cell Type":"120 Half-cut Mono Cells","Origin":"Made in Singapore","Subcategory":"mono"}'::jsonb
    ),
(
      'JA Solar Deep Blue 4.0 Pro 620W Bifacial Solar Panel',
      'ja-solar-deep-blue-40-pro-620w-bifacial-solar-panel',
      'JA Solar Deep Blue 4.0 Pro 620W Bifacial Solar Panel – Overview
The JA Solar Deep Blue 4.0 Pro 620W Bifacial Solar Panel is a premium n-type double glass bifacial module engineered for high-efficiency commercial and utility-scale solar installations. Built with advanced MBB half-cell technology, this 620W solar panel delivers superior energy yield, enhanced durability, and long-term reliability under demanding environmental conditions.
Key Benefits
Advanced n-type cell technology ensures lower degradation and higher lifetime energy output.
Double glass bifacial structure increases rear-side gain for higher total power generation.
Up to 23.0% module efficiency maximizes power density in limited installation areas.
Excellent temperature coefficient provides stable performance in hot climates.
Strong mechanical load capacity supports heavy wind and snow conditions.
1500V DC system compatibility reduces BOS cost in large-scale projects.
Improved low-irradiance response enhances performance during cloudy weather.
Backed by 12-year product warranty and 30-year linear power output warranty.
TThis panel integrates effortlessly with 
MPPT/PWM charge controllers
 and works perfectly with 
Off-Grid inverters
, 
On-Grid inverters
, and 
Hybrid inverters
, ensuring maximum solar energy efficiency and reliable performance.
Technical Specifications
Parameter
Value
Rated Maximum Power (Pmax)
620W
Open Circuit Voltage (Voc)
48.50V
Maximum Power Voltage (Vmp)
40.21V
Short Circuit Current (Isc)
16.13A
Maximum Power Current (Imp)
15.42A
Module Efficiency
23.0%
Maximum System Voltage
1500V DC
Operating Temperature
-40°C to +85°C
Dimensions
2382 × 1134 × 30 mm
Weight
33.1 kg
Bifaciality
80% ±5%
Cell Type
n-type Mono
Number of Cells
132 (6×22)
Download Datasheet
 | For manufacturer details, see the official page: 
JA Solar Deep Blue 4.0 Pro JAM66D45-620 LB',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041472/solar_panels/JA_Solar_Deep_Blue_4_0_Pro_620W_Bifacial_Solar_Pan_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041472/solar_panels/JA_Solar_Deep_Blue_4_0_Pro_620W_Bifacial_Solar_Pan_0.png'],
      15,
      false,
      '{"Parameter":"Value","Rated Maximum Power (Pmax)":"620W","Open Circuit Voltage (Voc)":"48.50V","Maximum Power Voltage (Vmp)":"40.21V","Short Circuit Current (Isc)":"16.13A","Maximum Power Current (Imp)":"15.42A","Module Efficiency":"23.0%","Maximum System Voltage":"1500V DC","Operating Temperature":"-40°C to +85°C","Dimensions":"2382 × 1134 × 30 mm","Weight":"33.1 kg","Bifaciality":"80% ±5%","Cell Type":"n-type Mono","Number of Cells":"132 (6×22)","Subcategory":"bifacial"}'::jsonb
    ),
(
      'REC TwinPeak 4 Series 365W Half-Cut Mono Solar Panel',
      'rec-twinpeak-4-series-365w-half-cut-mono-solar-panel',
      'REC TwinPeak 4 Series 365W Half-Cut Mono Solar Panel – Overview
The REC TwinPeak 4 Series 365W solar panel delivers premium performance with its advanced half-cut mono c-Si technology. Designed with REC’s pioneering twin design, this panel ensures higher power density, excellent reliability, and long-term durability for both residential and commercial rooftop installations.
Key Benefits
Rated maximum power output of 365W at STC.
High module efficiency of up to 20%.
120 half-cut mono c-Si cells for reduced resistance and higher yield.
Industry-leading TwinPeak design improves energy performance.
PID-free and resistant to potential-induced degradation.
Strong load resistance: up to 7000Pa (front) and 4000Pa (rear).
Compact design ideal for residential and commercial rooftops.
25-year linear power output warranty with ProTrust option.
This panel integrates effortlessly with 
MPPT/PWM charge controllers
 and works perfectly with 
Off-Grid inverters
, 
On-Grid inverters
, and 
Hybrid inverters
, ensuring maximum solar energy efficiency and reliable performance.
Technical Specifications
Parameter
Value
Model
REC365TP4
Rated Maximum Power (Pmax)
365W
Module Efficiency
20%
Nominal Power Voltage (Vmp)
34.3V
Nominal Power Current (Imp)
10.65A
Open Circuit Voltage (Voc)
40.8V
Short Circuit Current (Isc)
11.32A
Dimensions
1755 × 1040 × 30 mm
Weight
20.0 kg
Operating Temperature
-40°C ~ +85°C
Maximum System Voltage
1000V
Maximum Series Fuse Rating
25A
Mechanical Load Capacity
7000 Pa (front) / 4000 Pa (rear)
Download Datasheet
 | For manufacturer details, see the official page: 
REC TwinPeak 4 Series 365W',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041481/solar_panels/REC_TwinPeak_4_Series_365W_Half_Cut_Mono_Solar_Pan_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041481/solar_panels/REC_TwinPeak_4_Series_365W_Half_Cut_Mono_Solar_Pan_0.png'],
      15,
      false,
      '{"Parameter":"Value","Model":"REC365TP4","Rated Maximum Power (Pmax)":"365W","Module Efficiency":"20%","Nominal Power Voltage (Vmp)":"34.3V","Nominal Power Current (Imp)":"10.65A","Open Circuit Voltage (Voc)":"40.8V","Short Circuit Current (Isc)":"11.32A","Dimensions":"1755 × 1040 × 30 mm","Weight":"20.0 kg","Operating Temperature":"-40°C ~ +85°C","Maximum System Voltage":"1000V","Maximum Series Fuse Rating":"25A","Mechanical Load Capacity":"7000 Pa (front) / 4000 Pa (rear)","Subcategory":"mono"}'::jsonb
    ),
(
      'AE SOLAR 550W AE MD-144 Series',
      'ae-solar-550w-ae-md-144-series',
      'The 
AE SOLAR 550W MD-144 Series
 solar panel is a high-performance, durable photovoltaic module engineered for maximum efficiency in both residential and commercial solar systems. With a rated power output of 550W, this mono PERC solar panel delivers superior energy generation, even under challenging environmental conditions, ensuring that homeowners and businesses can achieve optimal energy efficiency and reduced electricity costs.
Designed with advanced bifacial technology, the AE SOLAR 550W panel captures sunlight from both its front and rear sides, increasing energy yield and optimizing overall system performance. This bifacial capability allows the panel to generate additional energy from reflected sunlight, making it particularly suitable for installations on reflective surfaces, such as white rooftops, concrete, or light-colored grounds. Its high-efficiency solar cells enable more power generation per square meter, which is crucial for projects where roof space is limited or for large-scale solar farms aiming to maximize output from available land.
The panel is constructed with a sturdy, corrosion-resistant aluminum frame and tempered glass, providing excellent resistance against snow loads, high winds, and other harsh weather elements. AE SOLAR ensures rigorous quality control, testing each module to meet international standards such as 
IEC 61215
 and 
IEC 61730
, guaranteeing reliable performance, longevity, and safety. These certifications also confirm that the module can withstand extreme environmental stress while maintaining optimal energy output over time.
Installation of the AE SOLAR 550W panel is straightforward, thanks to pre-drilled mounting holes and MC4-compatible connectors. This allows for fast, secure, and safe setup by professional installers and system integrators, reducing installation time and labor costs. Additionally, the panel features a low temperature coefficient, which ensures consistent power output even in hot climates, providing stable energy production throughout the year and minimizing performance losses during peak sunlight hours.
AE SOLAR is committed to sustainability. The 550W MD-144 Series panel is manufactured with environmentally responsible processes and materials, including lead-free and RoHS-compliant components, making it a safe and eco-friendly choice for clean, renewable energy generation. By investing in these panels, users contribute to reducing carbon footprints and promoting green energy solutions.
The AE SOLAR 550W panel is backed by a 
12-year product warranty
 and a 
25-year linear power performance warranty
, providing long-term reliability and peace of mind. Whether for rooftop installations, commercial solar farms, or utility-scale projects, this panel is designed to meet the highest expectations in energy production, efficiency, and durability.
Applications for the AE SOLAR 550W MD-144 Series are diverse. For residential use, it can help homeowners reduce their dependency on grid electricity while providing reliable energy for daily needs. In commercial and industrial settings, multiple panels can be combined to create high-output solar systems that significantly lower operational energy costs. Utility-scale projects benefit from its high energy yield, reliability, and ease of installation, making it an ideal choice for large solar farms aiming to achieve maximum return on investment.
Key Features:
Rated Power: 550W
Technology: Mono PERC, high-efficiency cells
Bifacial design for enhanced energy yield
Robust aluminum frame and tempered glass
IEC 61215 and IEC 61730 certified
Low temperature coefficient for stable output
Easy installation with MC4 connectors
12-year product warranty, 25-year linear performance warranty
Ideal for rooftops, solar farms, and utility-scale projects
Specifications:
Module Type: AE MD-144 Series
Maximum Power (Pmax): 550W
Open Circuit Voltage (Voc): 49.8V
Short Circuit Current (Isc): 13.5A
Maximum System Voltage: 1500V DC
Dimensions: 2278 × 1134 × 35 mm
Weight: 29 kg
Operating Temperature: -40°C to +85°C
With its combination of 
high efficiency, durability, and eco-friendly design
, the AE SOLAR 550W MD-144 Series panel is a top choice for anyone seeking reliable solar energy solutions. Whether your goal is reducing energy costs, achieving sustainability targets, or building high-performance solar systems, this panel provides exceptional performance, long-term reliability, and peace of mind for decades of clean energy generation.',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041469/solar_panels/AE_SOLAR_550W_AE_MD_144_Series_0.webp',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041469/solar_panels/AE_SOLAR_550W_AE_MD_144_Series_0.webp', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041470/solar_panels/AE_SOLAR_550W_AE_MD_144_Series_1.webp'],
      15,
      false,
      '{"Subcategory":"mono"}'::jsonb
    ),
(
      'Jinko 615W N-Type Bifacial Solar Panel (Official)',
      'jinko-615w-n-type-bifacial-solar-panel-official',
      'The Jinko Solar Tiger Neo 615W N‑Type Bifacial Solar Panel (Official) is a state-of-the-art solar module designed to deliver exceptional energy efficiency, reliability, and durability for commercial, industrial, and utility-scale solar installations. Part of Jinko Solar’s Tiger Neo series, this 615W module combines advanced N-type monocrystalline TOPCon cell technology with a bifacial design, ensuring superior performance even in challenging environmental conditions. With high power output, low degradation rates, and enhanced energy capture, this solar panel represents one of the most effective solutions for maximizing solar energy production today.
Cell Technology and Efficiency
This module utilizes N-Type monocrystalline cells, which are renowned for their high efficiency and resistance to Light Induced Degradation (LID) and LeTID effects. N-Type cells maintain long-term performance, ensuring that the panel continues to generate consistent energy over decades. The TOPCon (Tunnel Oxide Passivated Contact) technology further enhances cell efficiency, allowing the module to reach an impressive maximum power output of 615 watts. SMBB (Super Multi Busbar) technology improves current collection, reducing electrical losses and contributing to higher overall energy yield.
Bifacial Design for Enhanced Energy Production
The Jinko 615W panel features a dual-glass bifacial design, which allows the module to capture sunlight not only from the front but also from the rear side. This design can increase energy yield by up to 20% under optimal reflective surface conditions. The dual-glass construction enhances the structural strength of the panel while providing additional protection against environmental factors such as wind, snow, and hail. The module is rated to withstand wind loads of up to 2400 Pa and snow loads of up to 5400 Pa, making it suitable for a wide range of installation environments.
Electrical Specifications and Performance
The panel delivers a maximum power voltage (Vmp) of approximately 40.60 V and a maximum power current (Imp) of approximately 15.15 A. Its open-circuit voltage (Voc) is about 48.88 V, and short-circuit current (Isc) is 16.02 A. With a power tolerance of 0 to +3%, users can be confident in receiving reliable output close to the rated power. The module operates efficiently across a wide temperature range, from –40°C to +85°C, and features a temperature coefficient of –0.29%/°C for maximum power, ensuring stable performance in varying climatic conditions. The panel is compatible with systems up to 1500 V DC, making it suitable for large-scale solar arrays.
Durability and Build Quality
The Jinko 615W panel is constructed with an anodized aluminum alloy frame and a robust dual-glass structure. The junction box is IP68 rated, and the module uses MC4-compatible connectors for secure and reliable electrical connections. This robust design ensures long-term durability, resistance to PID (Potential Induced Degradation), and protection against mechanical and environmental stress.
Warranty and Reliability
Jinko Solar offers a 12-year product warranty and a 30-year linear performance warranty on the Tiger Neo 615W N-Type Bifacial module. This extensive warranty guarantees that the module will retain high performance over its operational life, with minimal degradation, making it a dependable choice for both investors and end-users seeking long-term energy generation.
Applications
This high-power solar panel is ideal for commercial rooftops, industrial solar projects, and utility-scale solar farms. Its bifacial design allows for enhanced energy capture in environments where reflective surfaces such as concrete, sand, or white gravel are present beneath the panels. The combination of N-Type cells, HOT 2.0 technology, and SMBB busbars ensures maximum efficiency, making it suitable for regions with high solar irradiance and demanding energy requirements.
Advantages
High maximum power output of 615W reduces the number of panels required for large-scale systems.
N-Type TOPCon cells minimize degradation and maintain energy production over time.
Bifacial design increases energy yield by capturing reflected sunlight from the rear.
Robust dual-glass construction withstands high wind and snow loads.
PID-resistant design ensures long-term stable performance.
Wide operating temperature range allows installation in diverse climatic conditions.
Conclusion
The Jinko Solar Tiger Neo 615W N‑Type Bifacial Solar Panel is a premium, high-efficiency module that combines cutting-edge solar technology with durable engineering. It is designed for users seeking maximum energy production, long-term reliability, and low operational losses. Whether for commercial, industrial, or utility-scale projects, this module offers superior performance, reduced system costs, and exceptional return on investment. Its advanced N-Type bifacial cells, high mechanical strength, and long warranty make it a standout choice in today’s solar energy market.',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041475/solar_panels/Jinko_615W_N_Type_Bifacial_Solar_Panel__Official__0.webp',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041475/solar_panels/Jinko_615W_N_Type_Bifacial_Solar_Panel__Official__0.webp', 'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041476/solar_panels/Jinko_615W_N_Type_Bifacial_Solar_Panel__Official__1.webp'],
      15,
      false,
      '{"Subcategory":"bifacial"}'::jsonb
    ),
(
      'Jinko 585W N-Type Bifacial Solar Panel',
      'jinko-585w-n-type-bifacial-solar-panel',
      'Jinko 585W N-Type Bifacial Solar Panel
The Jinko 585W N-Type Bifacial Solar Panel is a high-performance solar module designed to deliver exceptional energy efficiency and reliability for residential, commercial, and industrial solar applications. Built with advanced N-Type solar cells, this panel provides superior power output, reduced degradation, and long-term energy production stability, making it a top choice for sustainable energy solutions.
One of the standout features of this solar panel is its bifacial design. Unlike conventional panels, the Jinko 585W can capture sunlight from both the front and rear sides, increasing total energy generation and overall efficiency. This makes it an ideal solution for rooftops, open ground installations, and areas with reflective surfaces where additional energy can be harvested from reflected sunlight. By maximizing solar energy collection, this panel ensures higher returns on investment and faster energy payback.
The dual-glass construction adds both durability and reliability to the panel. It provides excellent protection against environmental factors such as rain, wind, dust, and extreme temperatures. This robust design ensures the panel can withstand harsh conditions without compromising performance. Furthermore, the high mechanical strength of the dual-glass panel makes it suitable for large-scale solar farms, commercial projects, and residential rooftops where long-term reliability is critical.
Jinko’s N-Type solar cells are known for their low degradation rate, meaning the panel maintains its efficiency over a longer period compared to conventional P-Type panels. This translates into sustained energy production and better financial returns for solar investors. With a powerful 585W output, this panel is capable of meeting high energy demands, making it suitable for modern homes, factories, offices, and large-scale solar installations.
The Jinko 585W N-Type Bifacial Solar Panel also offers excellent performance in low-light conditions, such as cloudy days or early morning and late afternoon sunlight. This ensures consistent energy supply throughout the day, minimizing downtime and maximizing energy efficiency. Additionally, the panel’s premium quality components and meticulous engineering guarantee a long lifespan, allowing users to enjoy clean, renewable energy for decades.
Installing this panel is straightforward and flexible. Its standard dimensions and compatibility with most mounting systems make it easy for solar installers to integrate it into existing solar arrays or new solar projects. Whether used as part of a residential solar rooftop system, a commercial energy project, or a large-scale solar farm, the Jinko 585W N-Type Bifacial Solar Panel is engineered to deliver reliable, efficient, and sustainable solar energy.
In conclusion, the Jinko 585W N-Type Bifacial Solar Panel combines advanced N-Type technology, bifacial energy harvesting, and dual-glass durability to provide one of the most efficient and reliable solar modules available today. By choosing this panel, customers can maximize energy production, reduce electricity costs, and contribute to a greener, more sustainable future. With superior efficiency, robust construction, and long-term reliability, the Jinko 585W is a perfect investment for anyone seeking high-quality solar solutions in Bangladesh or worldwide.
Category
Specification
Model
JKM565‑585N‑72HL4-(V)-F3
Panel Type
N-Type, Mono-crystalline
Cell Count
144 cells (6 × 24)
Maximum Power (Pmax)
565 W – 585 W
Maximum Power Voltage (Vmp)
565 W: ~41.92 V

585 W: ~42.52 V
Maximum Power Current (Imp)
565 W: 13.48 A

585 W: 13.76 A
Open-Circuit Voltage (Voc)
565 W: 50.60 V

585 W: 51.16 V
Short-Circuit Current (Isc)
565 W: 14.23 A

585 W: 14.55 A
Module Efficiency (STC)
21.87% – 22.65%
Power Tolerance
0 ~ +3%
Temperature Coefficients
Pmax: −0.29%/°C

Voc: −0.25%/°C

Isc: +0.045%/°C
Nominal Operating Cell Temp. (NOCT)
~45 °C ± 2°C
Operating Temperature
−40°C to +85°C
Maximum System Voltage
1000 / 1500 V DC (IEC)
Series Fuse Rating
25 A
Mechanical Load Rating
Wind Load: 2400 Pa

Snow Load: 5400 Pa
Technology
SMBB + Hot 2.0 Technology for high energy and low LID/LETID
Durability
Resistant to high salt mist & ammonia environments
Junction Box
IP68 rated
Output Cable
(+) 400 mm, (–) 200 mm (customizable)
Front Glass
3.2 mm tempered, anti-reflective, high-transmission, low-iron glass
Frame
Anodized aluminum alloy
Weight
~28 kg
Warranty
Product: 12 years

Linear Performance: 30 years, 87.4% guaranteed',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041473/solar_panels/Jinko_585W_N_Type_Bifacial_Solar_Panel_0.webp',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041473/solar_panels/Jinko_585W_N_Type_Bifacial_Solar_Panel_0.webp'],
      15,
      false,
      '{"Category":"Specification","Model":"JKM565‑585N‑72HL4-(V)-F3","Panel Type":"N-Type, Mono-crystalline","Cell Count":"144 cells (6 × 24)","Maximum Power (Pmax)":"565 W – 585 W","Maximum Power Voltage (Vmp)":"565 W: ~41.92 V\n585 W: ~42.52 V","Maximum Power Current (Imp)":"565 W: 13.48 A\n585 W: 13.76 A","Open-Circuit Voltage (Voc)":"565 W: 50.60 V\n585 W: 51.16 V","Short-Circuit Current (Isc)":"565 W: 14.23 A\n585 W: 14.55 A","Module Efficiency (STC)":"21.87% – 22.65%","Power Tolerance":"0 ~ +3%","Temperature Coefficients":"Pmax: −0.29%/°C\nVoc: −0.25%/°C\nIsc: +0.045%/°C","Nominal Operating Cell Temp. (NOCT)":"~45 °C ± 2°C","Operating Temperature":"−40°C to +85°C","Maximum System Voltage":"1000 / 1500 V DC (IEC)","Series Fuse Rating":"25 A","Mechanical Load Rating":"Wind Load: 2400 Pa\nSnow Load: 5400 Pa","Technology":"SMBB + Hot 2.0 Technology for high energy and low LID/LETID","Durability":"Resistant to high salt mist & ammonia environments","Junction Box":"IP68 rated","Output Cable":"(+) 400 mm, (–) 200 mm (customizable)","Front Glass":"3.2 mm tempered, anti-reflective, high-transmission, low-iron glass","Frame":"Anodized aluminum alloy","Weight":"~28 kg","Warranty":"Product: 12 years\nLinear Performance: 30 years, 87.4% guaranteed","Subcategory":"bifacial"}'::jsonb
    ),
(
      'Jinko 585W N-Type Bifacial Solar Panel (Official)',
      'jinko-585w-n-type-bifacial-solar-panel-official',
      'Jinko 585W N-Type Bifacial Solar Panel
The Jinko 585W N-Type Bifacial Solar Panel is a high-performance solar module designed to deliver exceptional energy efficiency and reliability for residential, commercial, and industrial solar applications. Built with advanced N-Type solar cells, this panel provides superior power output, reduced degradation, and long-term energy production stability, making it a top choice for sustainable energy solutions.
One of the standout features of this solar panel is its bifacial design. Unlike conventional panels, the Jinko 585W can capture sunlight from both the front and rear sides, increasing total energy generation and overall efficiency. This makes it an ideal solution for rooftops, open ground installations, and areas with reflective surfaces where additional energy can be harvested from reflected sunlight. By maximizing solar energy collection, this panel ensures higher returns on investment and faster energy payback.
The dual-glass construction adds both durability and reliability to the panel. It provides excellent protection against environmental factors such as rain, wind, dust, and extreme temperatures. This robust design ensures the panel can withstand harsh conditions without compromising performance. Furthermore, the high mechanical strength of the dual-glass panel makes it suitable for large-scale solar farms, commercial projects, and residential rooftops where long-term reliability is critical.
Jinko’s N-Type solar cells are known for their low degradation rate, meaning the panel maintains its efficiency over a longer period compared to conventional P-Type panels. This translates into sustained energy production and better financial returns for solar investors. With a powerful 585W output, this panel is capable of meeting high energy demands, making it suitable for modern homes, factories, offices, and large-scale solar installations.
The Jinko 585W N-Type Bifacial Solar Panel also offers excellent performance in low-light conditions, such as cloudy days or early morning and late afternoon sunlight. This ensures consistent energy supply throughout the day, minimizing downtime and maximizing energy efficiency. Additionally, the panel’s premium quality components and meticulous engineering guarantee a long lifespan, allowing users to enjoy clean, renewable energy for decades.
Installing this panel is straightforward and flexible. Its standard dimensions and compatibility with most mounting systems make it easy for solar installers to integrate it into existing solar arrays or new solar projects. Whether used as part of a residential solar rooftop system, a commercial energy project, or a large-scale solar farm, the Jinko 585W N-Type Bifacial Solar Panel is engineered to deliver reliable, efficient, and sustainable solar energy.
In conclusion, the Jinko 585W N-Type Bifacial Solar Panel combines advanced N-Type technology, bifacial energy harvesting, and dual-glass durability to provide one of the most efficient and reliable solar modules available today. By choosing this panel, customers can maximize energy production, reduce electricity costs, and contribute to a greener, more sustainable future. With superior efficiency, robust construction, and long-term reliability, the Jinko 585W is a perfect investment for anyone seeking high-quality solar solutions in Bangladesh or worldwide.
Category
Specification
Model
JKM565‑585N‑72HL4-(V)-F3
Panel Type
N-Type, Mono-crystalline
Cell Count
144 cells (6 × 24)
Maximum Power (Pmax)
565 W – 585 W
Maximum Power Voltage (Vmp)
565 W: ~41.92 V

585 W: ~42.52 V
Maximum Power Current (Imp)
565 W: 13.48 A

585 W: 13.76 A
Open-Circuit Voltage (Voc)
565 W: 50.60 V

585 W: 51.16 V
Short-Circuit Current (Isc)
565 W: 14.23 A

585 W: 14.55 A
Module Efficiency (STC)
21.87% – 22.65%
Power Tolerance
0 ~ +3%
Temperature Coefficients
Pmax: −0.29%/°C

Voc: −0.25%/°C

Isc: +0.045%/°C
Nominal Operating Cell Temp. (NOCT)
~45 °C ± 2°C
Operating Temperature
−40°C to +85°C
Maximum System Voltage
1000 / 1500 V DC (IEC)
Series Fuse Rating
25 A
Mechanical Load Rating
Wind Load: 2400 Pa

Snow Load: 5400 Pa
Technology
SMBB + Hot 2.0 Technology for high energy and low LID/LETID
Durability
Resistant to high salt mist & ammonia environments
Junction Box
IP68 rated
Output Cable
(+) 400 mm, (–) 200 mm (customizable)
Front Glass
3.2 mm tempered, anti-reflective, high-transmission, low-iron glass
Frame
Anodized aluminum alloy
Weight
~28 kg
Warranty
Product: 12 years

Linear Performance: 30 years, 87.4% guaranteed',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041473/solar_panels/Jinko_585W_N_Type_Bifacial_Solar_Panel__Official__0.webp',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041473/solar_panels/Jinko_585W_N_Type_Bifacial_Solar_Panel__Official__0.webp'],
      15,
      false,
      '{"Category":"Specification","Model":"JKM565‑585N‑72HL4-(V)-F3","Panel Type":"N-Type, Mono-crystalline","Cell Count":"144 cells (6 × 24)","Maximum Power (Pmax)":"565 W – 585 W","Maximum Power Voltage (Vmp)":"565 W: ~41.92 V\n585 W: ~42.52 V","Maximum Power Current (Imp)":"565 W: 13.48 A\n585 W: 13.76 A","Open-Circuit Voltage (Voc)":"565 W: 50.60 V\n585 W: 51.16 V","Short-Circuit Current (Isc)":"565 W: 14.23 A\n585 W: 14.55 A","Module Efficiency (STC)":"21.87% – 22.65%","Power Tolerance":"0 ~ +3%","Temperature Coefficients":"Pmax: −0.29%/°C\nVoc: −0.25%/°C\nIsc: +0.045%/°C","Nominal Operating Cell Temp. (NOCT)":"~45 °C ± 2°C","Operating Temperature":"−40°C to +85°C","Maximum System Voltage":"1000 / 1500 V DC (IEC)","Series Fuse Rating":"25 A","Mechanical Load Rating":"Wind Load: 2400 Pa\nSnow Load: 5400 Pa","Technology":"SMBB + Hot 2.0 Technology for high energy and low LID/LETID","Durability":"Resistant to high salt mist & ammonia environments","Junction Box":"IP68 rated","Output Cable":"(+) 400 mm, (–) 200 mm (customizable)","Front Glass":"3.2 mm tempered, anti-reflective, high-transmission, low-iron glass","Frame":"Anodized aluminum alloy","Weight":"~28 kg","Warranty":"Product: 12 years\nLinear Performance: 30 years, 87.4% guaranteed","Subcategory":"bifacial"}'::jsonb
    ),
(
      'LONGi LR4-72HBD-445M 445W Bifacial Half-Cut Mono Solar Panel',
      'longi-lr4-72hbd-445m-445w-bifacial-half-cut-mono-solar-panel',
      'LONGi LR4-72HBD-445M 445W Bifacial Half-Cut Mono Solar Panel – Overview
The LONGi LR4-72HBD-445M is a bifacial mono half-cut solar panel designed for high-power applications in ground-mounted power plants and commercial projects. With bifacial gain, dual-glass construction, and 21.0% efficiency, it delivers outstanding performance, durability, and long-term reliability even in demanding environments.
Key Benefits
445W rated power output with bifacial gain up to 25%.
Half-cut mono PERC cells enhance efficiency and reduce resistive losses.
Durable dual-glass construction with tempered heat-strengthened glass.
21.0% module efficiency with lower power degradation.
Strong mechanical load capacity: 5400Pa front and 2400Pa rear.
Certified for IEC, UL, and TÜV safety standards.
Excellent performance under low-light and high-temperature conditions.
30-year linear power warranty and 12-year product warranty.
This panel integrates effortlessly with 
MPPT/PWM charge controllers
 and works perfectly with 
Off-Grid inverters
, 
On-Grid inverters
, and 
Hybrid inverters
, ensuring maximum solar energy efficiency and reliable performance.
Technical Specifications
Parameter
Value
Model
LR4-72HBD-445M
Rated Maximum Power (Pmax)
445W
Module Efficiency
21.0%
Open Circuit Voltage (Voc)
49.4V
Short Circuit Current (Isc)
11.72A
Voltage at Maximum Power (Vmp)
41.2V
Current at Maximum Power (Imp)
10.80A
Dimensions
2094 × 1038 × 35 mm
Weight
27.5 kg
Operating Temperature
-40°C ~ +85°C
Maximum System Voltage
1500V DC
Maximum Series Fuse Rating
25A
Mechanical Load Capacity
5400 Pa (front) / 2400 Pa (rear)
Bifaciality
70 ± 5%
Download Datasheet
 | For manufacturer details, see the official page: 
LONGi LR4-72HBD-445M',
      10000,
      'solar',
      'https://res.cloudinary.com/wgjgoifx/image/upload/v1783041477/solar_panels/LONGi_LR4_72HBD_445M_445W_Bifacial_Half_Cut_Mono_S_0.png',
      ARRAY['https://res.cloudinary.com/wgjgoifx/image/upload/v1783041477/solar_panels/LONGi_LR4_72HBD_445M_445W_Bifacial_Half_Cut_Mono_S_0.png'],
      15,
      false,
      '{"Parameter":"Value","Model":"LR4-72HBD-445M","Rated Maximum Power (Pmax)":"445W","Module Efficiency":"21.0%","Open Circuit Voltage (Voc)":"49.4V","Short Circuit Current (Isc)":"11.72A","Voltage at Maximum Power (Vmp)":"41.2V","Current at Maximum Power (Imp)":"10.80A","Dimensions":"2094 × 1038 × 35 mm","Weight":"27.5 kg","Operating Temperature":"-40°C ~ +85°C","Maximum System Voltage":"1500V DC","Maximum Series Fuse Rating":"25A","Mechanical Load Capacity":"5400 Pa (front) / 2400 Pa (rear)","Bifaciality":"70 ± 5%","Subcategory":"bifacial"}'::jsonb
    )
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  stock_quantity = EXCLUDED.stock_quantity,
  specs = EXCLUDED.specs,
  updated_at = now();
