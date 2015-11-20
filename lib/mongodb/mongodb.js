/*
    ████████████████████████████████████████████████████████████████████████████████████████████████████
    * MongoDB: MongoDB.js v0.0.0.1
    * https://azmisahin.github.io
    ════════════════════════════════════════════════════════════════════════════════════════════════════
    * Copyright bilgi@azmisahin.com
    * Licence (https://github.com/azmisahin)
    ████████████████████████████████████████████████████████████████████████████████████████████████████
*/

/*
    ════════════════════════════════════════════════════════════════════════════════════════════════════
    * Jquery: jquery.js 
    * Requared Min > v1.9.1
    ════════════════════════════════════════════════════════════════════════════════════════════════════
*/
if (typeof jQuery === 'undefined') { throw new Error('MongoDB\'s JavaScript requires jQuery') } else console.log("MongoDB initalize");
+function ($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('MongoDB\'s JavaScript requires jQuery version 1.9.1 or higher')
    } else { console.log("MongoDB Jquery version requestment is OK : " + version) }
}(jQuery);

/// MongoDB
/// <returns type="MongoDB" />
function MongoDB() { this.init(); }

/*
    ════════════════════════════════════════════════════════════════════════════════════════════════════
    * MongoDB: How to use
    ════════════════════════════════════════════════════════════════════════════════════════════════════
    var newMongoDB = new MongoDB();    
*/
MongoDB.prototype = (function () {

    var models = [];
    var model = {};
    
    var connection = {
        String: '',
        Method: 'get',
        Data: '',
        Server: 'https://api.mongolab.com/api/1/databases/',
        Database: '%DatabaseName%',
        Collection: 'CollectionName',
        Token: '%API Key&',
        Params: '&s={"_Id":1}' + '&l=50000'//100000000
    };

    /// Setting Connection String     
    /// <returns type="connection" />
    function setString()
    {
        connection.String = connection.Server + connection.Database + '/collections/' + connection.Collection + '?apiKey=' + connection.Token + connection.Params;
        return connection
    }

    /// Config
    /// <param name="server" type="String">To connect </param>    
    /// <param name="database" type="String">Database Name</param>    
    /// <param name="collection" type="String">Collection Name</param>    
    /// <param name="token" type="String">Api Key</param>    
    /// <param name="params" type="String">Parameters ( Optional ) </param>        
    /// <returns type="connection" />
    function Config(server, database, collection, token, params) {
        connection.Server = server;
        connection.Database = database;
        connection.Collection = collection;
        connection.Token = token;
        if (params != null && params != undefined) {
            connection.Params = params;
        }
        setString();//Setting Connection String Arguments
        return connection;
        
    }

    /// Init        
    function Init()
    {}

    /// Find
    /// <param name="id" type="String">Primary Key</param>        
    /// <returns type="model" />
    function Find(id) {
        model.id = id;        
        return model;
    }

    /// List   
    /// <param name="params" type="String">Query Parameter</param>   
    /// <returns type="models" />
    function List(params) {
        connection.Method = 'get';
        connection.Data = params;
        models = Connect(params);

        //Model Convertions oid = id
        $.each(models, function (key, item) {
            models[key]._id = item._id.$oid
        });
        return models;
    }

    /// Insert   
    /// <param name="model" type="object">Model Based Insert</param>   
    /// <returns type="Inserted model" />
    function Insert(model) {
        connection.Method = 'post';
        connection.Data = JSON.stringify(model);;
        models = Connect(model);       
        return model;
    }

    /// Update   
    /// <param name="model" type="object">Model Based Update</param>   
    /// <returns type="Updated model" />
    function Update(model) {
        connection.Method = 'put';
        connection.Data = JSON.stringify(model);;
        models = Connect(model);
        return model;
    }

    /// Delete   
    /// <param name="id" type="String">Primary Key</param>   
    /// <returns type="Delete model" />
    function Delete(id) {
        connection.String = connection.Server + connection.Database + connection.Collection + "/" + id + connection.Token
        connection.Method = 'DELETE';
        connection.Data = null;
        models = Connect(null);
        return models;
    }

    /*
    Public Functions
    ────────────────────────────────────────────────────────────────────────────────────────────────────*/
    return {
        Version: "0.0.0.1",
        constructor: MongoDB,
        init: function () { Init(); },
        config: function (server, database, collection, token, params) { return Config(server, database, collection, token, params); },
        find: function (id) { return Find(id); },
        list: function () { return List(params = null); },
        insert: function (model) { return Insert(model); },
        update: function (model) { return Update(model); },
        deleted: function (id) { return Delete(id); }
    }

    /// Connect
    function Connect(params) {
        var result = [];
        var ajaxSetup = {
            async: false,
            url: connection.String,
            data: connection.Data,
            type: connection.Method,
            contentType: 'application/json',
            success: function (data) {                
                result = data;
            }
        };
        $.ajax(ajaxSetup);
        return result;
    }//Connect

})();

var mongoDB = new MongoDB();