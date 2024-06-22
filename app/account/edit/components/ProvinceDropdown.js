// src/components/ProvinceCityDropdown.js

import React, { useState } from "react";

const provincesAndCities = {
  "Select a province": ["Select a province"],
  Abra: ["Bangued"],
  Agusan_del_Norte: ["Butuan City", "Cabadbaran City"],
  Agusan_del_Sur: ["Bayugan City"],
  Aklan: ["Kalibo"],
  Albay: ["Legazpi City", "Ligao City", "Tabaco City"],
  Antique: ["San Jose de Buenavista"],
  Apayao: ["Kabugao"],
  Aurora: ["Baler"],
  Basilan: ["Isabela City", "Lamitan City"],
  Bataan: ["Balanga City"],
  Batanes: ["Basco"],
  Batangas: ["Batangas City", "Lipa City", "Tanauan City"],
  Benguet: ["Baguio City"],
  Biliran: ["Naval"],
  Bohol: ["Tagbilaran City"],
  Bukidnon: ["Malaybalay City", "Valencia City"],
  Bulacan: ["Malolos City", "Meycauayan City", "San Jose del Monte City"],
  Cagayan: ["Tuguegarao City"],
  Camarines_Norte: ["Daet"],
  Camarines_Sur: ["Naga City", "Iriga City"],
  Camiguin: ["Mambajao"],
  Capiz: ["Roxas City"],
  Catanduanes: ["Virac"],
  Cavite: [
    "Bacoor City",
    "Cavite City",
    "Dasmariñas City",
    "General Trias City",
    "Imus City",
    "Tagaytay City",
    "Trece Martires City",
  ],
  Cebu: [
    "Cebu City",
    "Mandaue City",
    "Lapu-Lapu City",
    "Toledo City",
    "Talisay City",
    "Naga City",
    "Danao City",
    "Carcar City",
    "Bogo City",
  ],
  Compostela_Valley: ["Nabunturan"],
  Cotabato: ["Kidapawan City"],
  Davao_del_Norte: ["Tagum City", "Panabo City", "Samal City"],
  Davao_del_Sur: ["Davao City", "Digos City"],
  Davao_Occidental: ["Malita"],
  Davao_Oriental: ["Mati City"],
  Dinagat_Islands: ["San Jose"],
  Eastern_Samar: ["Borongan City"],
  Guimaras: ["Jordan"],
  Ifugao: ["Lagawe"],
  Ilocos_Norte: ["Laoag City"],
  Ilocos_Sur: ["Vigan City", "Candon City"],
  Iloilo: ["Iloilo City", "Passi City"],
  Isabela: ["Ilagan City", "Cauayan City", "Santiago City"],
  Kalinga: ["Tabuk City"],
  La_Union: ["San Fernando City"],
  Laguna: [
    "San Pablo City",
    "Santa Rosa City",
    "Calamba City",
    "Biñan City",
    "Cabuyao City",
  ],
  Lanao_del_Norte: ["Iligan City"],
  Lanao_del_Sur: ["Marawi City"],
  Leyte: ["Tacloban City", "Ormoc City"],
  Maguindanao: ["Buluan"],
  Marinduque: ["Boac"],
  Masbate: ["Masbate City"],
  Metro_Manila: [
    "Caloocan",
    "Las Piñas",
    "Makati",
    "Malabon",
    "Mandaluyong",
    "Manila",
    "Marikina",
    "Muntinlupa",
    "Navotas",
    "Parañaque",
    "Pasay",
    "Pasig",
    "Quezon City",
    "San Juan",
    "Taguig",
    "Valenzuela",
    "Pateros",
  ],
  Misamis_Occidental: ["Oroquieta City", "Ozamiz City", "Tangub City"],
  Misamis_Oriental: ["Cagayan de Oro City", "El Salvador City", "Gingoog City"],
  Mountain_Province: ["Bontoc"],
  Negros_Occidental: [
    "Bacolod City",
    "Bago City",
    "Cadiz City",
    "Escalante City",
    "Himamaylan City",
    "Kabankalan City",
    "La Carlota City",
    "Sagay City",
    "San Carlos City",
    "Silay City",
    "Sipalay City",
    "Talisay City",
    "Victorias City",
  ],
  Negros_Oriental: [
    "Dumaguete City",
    "Bais City",
    "Bayawan City",
    "Canlaon City",
    "Guihulngan City",
    "Tanjay City",
  ],
  Northern_Samar: ["Catarman"],
  Nueva_Ecija: [
    "Cabanatuan City",
    "Gapan City",
    "Muñoz City",
    "Palayan City",
    "San Jose City",
  ],
  Nueva_Vizcaya: ["Bayombong"],
  Occidental_Mindoro: ["Mamburao"],
  Oriental_Mindoro: ["Calapan City"],
  Palawan: ["Puerto Princesa City"],
  Pampanga: ["Angeles City", "San Fernando City", "Mabalacat City"],
  Pangasinan: [
    "Dagupan City",
    "San Carlos City",
    "Urdaneta City",
    "Alaminos City",
  ],
  Quezon: ["Lucena City", "Tayabas City"],
  Quirino: ["Cabarroguis"],
  Rizal: ["Antipolo City"],
  Romblon: ["Romblon"],
  Samar: ["Catbalogan City", "Calbayog City"],
  Sarangani: ["Alabel"],
  Siquijor: ["Siquijor"],
  Sorsogon: ["Sorsogon City"],
  South_Cotabato: ["Koronadal City", "General Santos City"],
  Southern_Leyte: ["Maasin City"],
  Sultan_Kudarat: ["Isulan"],
  Sulu: ["Jolo"],
  Surigao_del_Norte: ["Surigao City"],
  Surigao_del_Sur: ["Tandag City"],
  Tarlac: ["Tarlac City"],
  Tawi_Tawi: ["Bongao"],
  Zambales: ["Olongapo City"],
  Zamboanga_del_Norte: ["Dipolog City", "Dapitan City"],
  Zamboanga_del_Sur: ["Pagadian City", "Zamboanga City"],
  Zamboanga_Sibugay: ["Ipil"],
};

const ProvinceCityDropdown = ({records}) => {

  //console.log(records[0].user.stateorprovince)
  const [selectedProvince, setSelectedProvince] = useState(records[0].user.stateorprovince);
  const [cities, setCities] = useState([records[0].user.city]);
  const [country, setCountry] = useState(records[0].user.country);

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setSelectedProvince(province);
    setCities(provincesAndCities[province] || []);
  };

  return (
    <div>
      <div>
        <label htmlFor="province">State/Province</label>
        <select
          id="province"
          name="province"
          className="mt-1 block w-full py-2 px-3 text-black border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          {Object.keys(provincesAndCities).map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="city">City</label>
        <select
          id="city"
          name="city"
          className="mt-1 block w-full text-black py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          disabled={
            !selectedProvince || selectedProvince === "Select a province"
          }
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="city">Country</label>
        <select
        value={country}
          onChange={(e)=>setCountry(e.target.value)}
          name="country"
          className="mt-1 block w-full text-black py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Select a country">Select a country</option>
          <option value="Philippines">Philippines</option>
        </select>
      </div>
    </div>
  );
};

export default ProvinceCityDropdown;
