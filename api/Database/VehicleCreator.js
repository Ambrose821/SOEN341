import Vehicle from "../models/Vehicle";

async function createVehicles(){
    
    const v1 = new Vehicle(
        'Chevrolet',
        'Tahoe',
        '34567890123456789',
        'https://example.com/chevrolet_tahoe.jpg',
        'GHI789',
        2020,
        'Black',
        true,
        90,
        8,
        4,
        'SUV',
        'Bob Johnson',
        30000
    );

    const v2 = new Vehicle(
        'Ford',
        'Mustang',
        '12345678901234567',
        'https://example.com/ford_mustang.jpg',
        'DEF123',
        2023,
        'Red',
        true,
        80,
        4,
        2,
        'convertible',
        'Emily Davis',
        15000
    );

    const v3 = new Vehicle(
        'BMW',
        'X5',
        '98765432109876543',
        'https://example.com/bmw_x5.jpg',
        'GHI456',
        2022,
        'White',
        true,
        100,
        5,
        4,
        'SUV',
        'Michael Johnson',
        20000
    );
    const v4 = new Vehicle(
        'Toyota',
        'Rav4',
        '34567890123456789',
        'https://example.com/toyota_rav4.jpg',
        'JKL789',
        2021,
        'Blue',
        true,
        70,
        5,
        4,
        'SUV',
        'Sarah Brown',
        25000
    );

    const v5 = new Vehicle(
        'Honda',
        'Accord',
        '01234567890123456',
        'https://example.com/honda_accord.jpg',
        'MNO012',
        2022,
        'Silver',
        true,
        60,
        5,
        4,
        'sedan',
        'Chris Evans',
        18000
    );

    const v6 = new Vehicle(
        'Mercedes-Benz',
        'G-Class',
        '23456789012345678',
        'https://example.com/mercedes_g_class.jpg',
        'PQR345',
        2020,
        'Black',
        true,
        120,
        5,
        4,
        'SUV',
        'Jessica White',
        30000
    );

    const v7 = new Vehicle(
        'Audi',
        'A4',
        '45678901234567890',
        'https://example.com/audi_a4.jpg',
        'STU678',
        2023,
        'Gray',
        true,
        80,
        5,
        4,
        'sedan',
        'Ryan Smith',
        15000
    );

    const v8 = new Vehicle(
        'Tesla',
        'Model 3',
        '78901234567890123',
        'https://example.com/tesla_model_3.jpg',
        'VWX901',
        2022,
        'Blue',
        true,
        90,
        5,
        4,
        'sedan',
        'Jennifer Lee',
        20000
    );

    const v9 = new Vehicle(
        'Subaru',
        'Outback',
        '90123456789012345',
        'https://example.com/subaru_outback.jpg',
        'YZA234',
        2021,
        'Green',
        true,
        75,
        5,
        4,
        'SUV',
        'David Wilson',
        25000
    );

    const v10 = new Vehicle(
        'Nissan',
        'Altima',
        '34567890123456789',
        'https://example.com/nissan_altima.jpg',
        'BCD567',
        2020,
        'Silver',
        true,
        65,
        5,
        4,
        'sedan',
        'Michelle Brown',
        18000
    );

    const v11 = new Vehicle(
        'Jeep',
        'Wrangler',
        '67890123456789012',
        'https://example.com/jeep_wrangler.jpg',
        'EFG345',
        2023,
        'Yellow',
        true,
        85,
        5,
        4,
        'SUV',
        'Daniel Johnson',
        22000
    );

    const v12 = new Vehicle(
        'Kawasaki ',
        'Ninja H2R',
        '56789012345678901',
        'https://example.com/chevrolet_camaro.jpg',
        'HIJ012',
        2024,
        'Yellow',
        true,
        85,
        4,
        2,
        'convertible',
        'Ambrose Mclaughlin',
        12000
    );
    module.exports.createVehicles();
}