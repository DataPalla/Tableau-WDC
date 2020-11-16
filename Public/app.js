
  
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
        id: "mortality_national_comparison_footnote",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "geocoded_column",
        dataType: tableau.dataTypeEnum.int,
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

    $.ajax({
      url:"https://data.medicare.gov/resource/xubh-q36u.csv",
      success: function (resp) {
         readCSVFile(resp);
        }
      });
    table.appendRows(tableData);
        doneCallback();
  };

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "Hospital Compare Data";
  tableau.submit();
}

function readCSVFile(response) {
  var lines = response.split("\n");

  for (var i = 0; i < lines.length; i++) {
     var _firstColumn = lines[i].split(";")[1];     //First column (Split on the separator!)
     //Do your stuff
     for (i = 0, len = lines.length; i < len; i++) {
      tableData.push({
        provider_id: _firstColumn.provider_id,
        hospital_name: _firstColumn.hospital_name,
        address: _firstColumn.address,
        city: _firstColumn.city,
        state: _firstColumn.state,
        zip_code: _firstColumn.zip_code,
        county_name: _firstColumn.county_name,
        phone_number: _firstColumn.phone_number,
        hospital_type: _firstColumn.hospital_type,
        hospital_ownership: _firstColumn.hospital_ownership,
        emergency_services: _firstColumn.emergency_services,
        meets_criteria_for_meaningful_use_of_ehrs: _firstColumn.meets_criteria_for_meaningful_use_of_ehrs,
        hospital_overall_rating: _firstColumn.hospital_overall_rating,
        hospital_overall_rating_footnote: _firstColumn.hospital_overall_rating_footnote,
        mortality_national_comparison: _firstColumn.mortality_national_comparison,
        mortality_national_comparison_footnote: _firstColumn.mortality_national_comparison_footnote,
        geocoded_column: _firstColumn.geocoded_column,
     });
  }
}
};