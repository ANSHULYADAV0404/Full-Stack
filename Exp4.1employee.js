const readline = require('readline');

let employees = []; // Array-based storage

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("\n--- Employee Management System ---");
    console.log("1. Add Employee ");
    console.log("2. View All Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");
    rl.question("\nChoose an option: ", handleMenu);
}

function addEmployee() {
    rl.question("Enter Unique ID: ", id => {
        // Validation: Check if ID already exists
        const exists = employees.find(emp => emp.id === id);
        
        if (exists) {
            console.log("❌ Error: ID " + id + " pehle se exist karti hai! Please unique ID dalein.");
            return addEmployee(); // Duplicate hone par dobara puchenge
        }

        rl.question("Enter Name: ", name => {
            rl.question("Enter Position: ", pos => {
                employees.push({ id, name, pos }); // Unique ID ke saath save
                console.log("✅ Employee Added Successfully!");
                showMenu();
            });
        });
    });
}

function handleMenu(choice) {
    switch (choice) {
        case '1':
            addEmployee();
            break;
        case '2':
            console.log("\n--- Employee List ---");
            if (employees.length === 0) console.log("List khali hai!");
            employees.forEach(e => console.log(`ID: ${e.id} | Name: ${e.name} | Position: ${e.pos}`));
            showMenu();
            break;
        case '3':
            rl.question("Enter ID to update: ", id => {
                let emp = employees.find(e => e.id === id);
                if (emp) {
                    rl.question("Enter New Name: ", name => {
                        emp.name = name;
                        console.log("Updated!");
                        showMenu();
                    });
                } else {
                    console.log("ID nahi mili!");
                    showMenu();
                }
            });
            break;
        case '4':
            rl.question("Enter ID to delete: ", id => {
                const initialLength = employees.length;
                employees = employees.filter(e => e.id !== id);
                if (employees.length < initialLength) {
                    console.log("Deleted!");
                } else {
                    console.log("ID nahi mili!");
                }
                showMenu();
            });
            break;
        case '5':
            console.log("Goodbye!");
            rl.close();
            break;
        default:
            console.log("Invalid Choice!");
            showMenu();
    }
}

showMenu();