
//Author: Sai Sandeep Palla
//Date: Nov 15 2020
//Usage: Web Data Connector between General Hospital information data (API endpoint - CSV output) to Tableau.

console.log("This is working!");

(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    const columns = [
      {
        id: "provider_id",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "hospital_name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "address",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "city",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "state",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "zip_code",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "county_name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "phone_number",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "hospital_type",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "hospital_ownership",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "emergency_services",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "meets_criteria_for_meaningful_use_of_ehrs",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "hospital_overall_rating",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "hospital_overall_rating_footnote",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "mortality_national_comparison",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "geocoded_column",
        dataType: tableau.geographicRoleEnum.zip_code_postcode,
      },
      {
        id: "mortality_national_comparison_footnote",
        dataType: tableau.dataTypeEnum.string,
      },
    ];

    let schema = {
      id: "HCD",
      alias: "Hospital Compare Data",
      columns: columns,
    };

    schemaCallback([schema]);
  };

  myConnector.getData = function (table, doneCallback) {
    let tableData = [];
    var i = 0;

    $.getJSON(
      "https://data.cms.gov/provider-data/api/1/metastore/schemas/dataset/items/xubh-q36u",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            provider_id: resp[i].provider_id,
            hospital_name: resp[i].hospital_name,
            address: resp[i].address,
            city: resp[i].city,
            state: resp[i].state,
            zip_code: resp[i].zip_code,
            county_name: resp[i].county_name,
            phone_number: resp[i].phone_number,
            hospital_type: resp[i].hospital_type,
            hospital_ownership: resp[i].hospital_ownership,
            emergency_services: resp[i].emergency_services,
            meets_criteria_for_meaningful_use_of_ehrs: resp[i].meets_criteria_for_meaningful_use_of_ehrs,
            hospital_overall_rating: resp[i].hospital_overall_rating,
            hospital_overall_rating_footnote: resp[i].hospital_overall_rating_footnote,
            mortality_national_comparison: resp[i].mortality_national_comparison,
            geocoded_column: resp[i].geocoded_column,
            mortality_national_comparison_footnote: resp[i].mortality_national_comparison_footnote,
         });
        }
        table.appendRows(tableData);
        doneCallback();
      }
    );
  };

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "Hospital Compare Data";
  tableau.submit();
}
