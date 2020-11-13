Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@DataPalla 
Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.


andre347
/
covid-wdc
1
10
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
covid-wdc/public/app.js /
@andre347
andre347 Completed for YouTube video
Latest commit 8a0319b on Aug 3
 History
 1 contributor
80 lines (71 sloc)  1.97 KB
  
console.log("This is working!");

(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    const covidCols = [
      {
        id: "Date_of_report",
        dataType: tableau.dataTypeEnum.date,
      },
      {
        id: "Municipality_code",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Municipality_name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Province",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Total_reported",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "Hospital_admission",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "Deceased",
        dataType: tableau.dataTypeEnum.int,
      },
    ];

    let covidTableSchema = {
      id: "RIVM",
      alias: "Dutch Corona Cases since start",
      columns: covidCols,
    };

    schemaCallback([covidTableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    let tableData = [];
    var i = 0;

    $.getJSON(
      "https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_cumulatief.json",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            Date_of_report: resp[i].Date_of_report,
            Municipality_code: resp[i].Municipality_code,
            Municipality_name: resp[i].Municipality_name,
            Province: resp[i].Province,
            Total_reported: resp[i].Total_reported,
            Hospital_admission: resp[i].Hospital_admission,
            Deceased: resp[i].Deceased,
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
  tableau.connectionName = "Dutch Corona Numbers";
  tableau.submit();
}
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
