
  
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
    $.ajax({
      url:"https://data.medicare.gov/resource/xubh-q36u.csv",
      success: function (resp) {
        td = readCSVFile(resp);
        table.appendRows(td);
        doneCallback();
        }
      });
      
  };

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "Hospital Compare Data";
  tableau.submit();
}

function readCSVFile(response) {
  var table;
  var lines = response.split("\n");
  let tableData = [];
  for (var i = 0; i < lines.length; i++) {
     var _firstColumn = lines[i].split(",");     //First column (Split on the separator!)
     //Do your stuff
      tableData.push({
        provider_id: _firstColumn[0].replace(/\"/g, "").trim(),
        hospital_name: _firstColumn[1].replace(/\"/g, "").trim(),
        address: _firstColumn[2].replace(/\"/g, "").trim(),
        city: _firstColumn[3].replace(/\"/g, "").trim(),
        state: _firstColumn[4].replace(/\"/g, "").trim(),
        zip_code: _firstColumn[5].replace(/\"/g, "").trim(),
        county_name: _firstColumn[6].replace(/\"/g, "").trim(),
        phone_number: _firstColumn[7].replace(/\"/g, "").trim(),
        hospital_type: _firstColumn[8].replace(/\"/g, "").trim(),
        hospital_ownership: _firstColumn[9].replace(/\"/g, "").trim(),
        emergency_services: _firstColumn[10].replace(/\"/g, "").trim(),
        meets_criteria_for_meaningful_use_of_ehrs: _firstColumn[11].replace(/\"/g, "").trim(),
        hospital_overall_rating: _firstColumn[12].replace(/\"/g, "").trim(),
        hospital_overall_rating_footnote: _firstColumn[13].replace(/\"/g, "").trim(),
        mortality_national_comparison: _firstColumn[14].replace(/\"/g, "").trim(),
        mortality_national_comparison_footnote: _firstColumn[15].replace(/\"/g, "").trim(),
        geocoded_column: _firstColumn["28"].substring(6).replace(/\"/g, "").trim(),
     });  
  }
  
  return tableData;
};