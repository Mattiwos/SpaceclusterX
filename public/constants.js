var m=-50;
//how much the ship is moved down from the center

var storagewidth = 50;
//constant: how big the resources appear in the queue


//constant : how many resources ther eare
var numOfResources=7;

var worldsize=2000;
//the radiuso of the world

//constant how spaced the upgrades
var modificationSpacing=50;

var upgradeResources=[[2,3],[1,2],[4,5],[5,6]];

var numOfResourcesUpgrade=[2,2,2,3];

// what are the different upgrades

upgradeName=["Reload","Laser Speed","Damage","Cargo Bay"];

upgradeCost=[10,10,10,5];

var citysize=50;

module.exports = { m, storagewidth, numOfResources, modificationSpacing ,upgradeResources ,numOfResourcesUpgrade,  citysize , upgradeName}