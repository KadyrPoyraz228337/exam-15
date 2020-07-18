const {I} = inject();

Given('я нахожусь на странице логина', () => {
    I.amOnPage('/login');
});

When('нажимаю на кнопку {string}', (btnName) => {
    I.click(btnName);
});

When('я заполняю поля формы:', table => {
    const tableData = table.parse().rawData;

    tableData.forEach(row => {
        I.fillField(row[0], row[1]);
    })
});

When('я вижу текст {string}', text => {
    I.waitForText(text, 10);
});

When('я нахожусь на странице добавления места', () => {
    I.amOnPage('/add/places')
});

When('я нахожусь на главной странице', () => {
    I.amOnPage('/')
});

When('я жду', () => {
    I.wait(5)
});


Given('я залогинен как администратор', table => {
    I.amOnPage('/login');

    const tableData = table.parse().rawData;

    tableData.forEach(row => {
        I.fillField(row[0], row[1]);
    });

    I.click("#login");
});