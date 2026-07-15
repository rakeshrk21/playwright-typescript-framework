import { expect, test } from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto(`http://localhost:4200`)
    await page.getByRole('link', { name: 'Forms'}).click()
})

// Skip this entire suite on CI - local development only
test.describe('Locators', async () => {
    test.skip('radio button', async ({page}) => {
        await page.getByText('Form Layouts').click()
        const nbCard = page.locator('nb-card', {hasText: 'Using the Grid'})
        const option1 = nbCard.getByText('Option 1')
        const option2 = nbCard.getByText('Option 2')
        await nbCard.getByPlaceholder('Email').pressSequentially('something', {delay:200})
        const text = await nbCard.getByPlaceholder('Email').inputValue()
        expect(text).toBe('something')
        await option1.click({ force: true })
        const status = await option1.isChecked()
        expect(status).toBe(true)
        await option2.click({ force: true })
        const status2 = await option2.isChecked()
        expect(status2).toBe(true)
        const status1 = await option1.isChecked()
        expect(status1).toBe(false)
        await page.screenshot({ fullPage: true, path:'test-results/hero.png', } )
    })

    test.skip('web-table', async ({page} ) => {
        await page.goto(`http://localhost:4200`)
        await page.getByRole('link', { name: 'Tables & Data'}).click()
        await page.getByRole('link', { name: 'Smart Table' }).click()
        const rows = page.locator('table tbody tr')
        const row = rows.filter({hasText: 'mdo@gmail.com'})
        page.on('dialog', (dialog) => { dialog.accept() })
        await row.locator('.nb-trash').click()
        await expect(rows.getByText('mdo@gmail.com')).toHaveCount(0)
    })

    test.skip('web-table- filter by age', async ({page} ) => {
        await page.goto(`http://localhost:4200`)
        await page.getByRole('link', { name: 'Tables & Data'}).click()
        await page.getByRole('link', { name: 'Smart Table' }).click()
        const secondRow = page.locator('table thead tr').nth(1)
        const row = secondRow.getByPlaceholder('Age')
        await row.pressSequentially('20')
        // await expect(rows.getByText('mdo@gmail.com')).toHaveCount(0)

        const rows= page.locator('table tbody tr')
        await page.pause();

        for (let row of await rows.all()){
            const age = await row.locator('td').last().textContent()
            expect(age).toBe('20')
        }
    })

    test.skip('web-table- date picker', async ({page} ) => {
        await page.getByText('Datepicker').click()
        const calendarLocator = page.getByPlaceholder('Form Picker')
        await calendarLocator.click()
        // await page.locator('.day-cell.ng-star-inserted').getByText('1', {exact: true}).click()

        const date = new Date()
        date.setDate(date.getDate() + 200)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('en-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('en-US', {month: 'long'})
        const expectedYear = date.getFullYear()

        const clickNext = page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        let actualCalendarDate = await page.locator('nb-calendar-view-mode').textContent()
        const expectedDateCalendar = ` ${expectedMonthLong} ${expectedYear}`

        while(actualCalendarDate && !actualCalendarDate.includes(expectedDateCalendar)) {
            await clickNext.click()
            actualCalendarDate = await page.locator('nb-calendar-view-mode').textContent()
        }

        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        await expect(calendarLocator).toHaveValue(`${expectedMonthShort} ${expectedDate}, ${expectedYear}`)
        await page.pause()
    })
})