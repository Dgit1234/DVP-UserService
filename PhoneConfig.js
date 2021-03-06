var mongoose = require('mongoose');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var PhoneConfig = require('dvp-mongomodels/model/PhoneConfig');
var messageFormatter = require('dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js');
var util = require('util');
var config = require('config');


module.exports.AddPhoneConfig = function (req, res) {

    var company = parseInt(req.user.company);
    var tenant = parseInt(req.user.tenant);
    var jsonString;

    var ticket = PhoneConfig({
        created_at: Date.now(),
        updated_at: Date.now(),
        enabled:true,
        autoAnswer: req.body.autoAnswer,
        allowAgentToChange: req.body.allowAgentToChange,
        autoAnswerDelay: parseInt(req.body.autoAnswerDelay) * 1000,
        company: company,
        tenant: tenant
    });

    ticket.save(function (err, client) {
        if (err) {
            jsonString = messageFormatter.FormatMessage(err, "AddPhoneConfig failed", false, undefined);
        }
        else {
            if (client) {
                jsonString = messageFormatter.FormatMessage(undefined, "AddPhoneConfig Successful", true, client);
            } else {
                jsonString = messageFormatter.FormatMessage(undefined, "AddPhoneConfig Found", false, client);
            }

        }
        res.end(jsonString);
    });
};

module.exports.GetPhoneConfig = function (req, res) {
    var company = parseInt(req.user.company);
    var tenant = parseInt(req.user.tenant);

    var jsonString;
    var qObj = {company: company, tenant: tenant, enabled: true};

    PhoneConfig.findOne(qObj).exec(function (err, pConfig) {
        if (err) {
            jsonString = messageFormatter.FormatMessage(err, "GetPhoneConfig Failed", false, undefined);
        } else {
            if (pConfig) {

                jsonString = messageFormatter.FormatMessage(undefined, "GetPhoneConfig Successful", true, pConfig);

            } else {

                jsonString = messageFormatter.FormatMessage(undefined, "No PhoneConfig Found", false, pConfig);

            }
        }
        res.end(jsonString);
    });

};

module.exports.UpdatePhoneConfig = function (req, res) {
    var company = parseInt(req.user.company);
    var tenant = parseInt(req.user.tenant);

    var jsonString;

    PhoneConfig.findOneAndUpdate({company: company, tenant: tenant, _id: req.params.id}, { autoAnswer: req.body.autoAnswer,allowAgentToChange: req.body.allowAgentToChange,
        autoAnswerDelay: parseInt(req.body.autoAnswerDelay) * 1000}, function (err, users) {
        if (err) {

            jsonString = messageFormatter.FormatMessage(err, "Update PhoneConfig Failed", false, undefined);

        } else {

            jsonString = messageFormatter.FormatMessage(err, "Update PhoneConfig Successful", true, users);

        }

        res.end(jsonString);
    });

};


module.exports.DeletePhoneConfig = function (req, res) {
    var company = parseInt(req.user.company);
    var tenant = parseInt(req.user.tenant);

    var jsonString;

    PhoneConfig.findOneAndRemove({company: company, tenant: tenant, _id: req.params.id}, function (err, users) {
        if (err) {

            jsonString = messageFormatter.FormatMessage(err, "Delete PhoneConfig Failed", false, undefined);

        } else {

            jsonString = messageFormatter.FormatMessage(err, "Successfully Delete PhoneConfig", true, users);

        }
        res.end(jsonString);
    });

};





