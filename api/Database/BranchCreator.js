const Branch = require("../models/Branch")


const createBranches = async () => {
    const Montreal = new Branch({
        BranchName: "Montreal",
        location: {
            type: 'Point',
            coordinates: [-73.5779, 45.4948] //Concordia Coordinates //longitude, latitude
         
        }
    })
    await Montreal.save()

    const Ottawa = new Branch({
        BranchName: "Ottawa",
        location: {
            type: 'Point',
            coordinates: [-75.6972, 45.4215] //Concordia Coordinates //longitude, latitude
         
        }
    })
    await Ottawa.save()

    const Toronto = new Branch({
        BranchName: "Toronto",
        location: {
            type: 'Point',
            coordinates: [-79.3832, 43.6532] //Concordia Coordinates //longitude, latitude
         
        }
    })
    await Toronto.save()

    const NYC = new Branch({
        BranchName: "NYC",
        location: {
            type: 'Point',
            coordinates: [-74.0060, 40.7128] //Concordia Coordinates //longitude, latitude
         
        }
    })
    await NYC.save()
    const Washington = new Branch({
        BranchName: "Washington",
        location: {
            type: 'Point',
            coordinates: [-77.0365, 38.895] //Concordia Coordinates //longitude, latitude
         
        }
    })
    await Washington.save()
}

module.exports = createBranches