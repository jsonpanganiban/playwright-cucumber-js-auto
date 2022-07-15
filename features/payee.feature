Feature: Payee Page

    As a user
    I want to test
    All basic scenarios


    Scenario: Verify you can navigate to Payees page using the navigation menu
        Given I am on the landing page
        When I navigate to Payees via navigation menu
        Then I should be able to see the Payees screen

# Scenario: Verify you can add new payee in the Payees page
#     Given I am on the Payees page
#     When I add new payee details:
#         | Name    | Jayson  |
#         | Bank    | 00      |
#         | Branch  | 1234    |
#         | Account | 0097251 |
#         | Suffix  | 000     |
#     Then Payee added message is displayed, and payee details is added
#         | Name | Jayson              |
#         | Bank | 00-1234-0097251-000 |

# Scenario: Verify payee name is a required field
#     Given I am on the Payees page
#     When Payee name is not populated
#     Then Mandatory field error is displayed
#     When Mandatory fields are populated
#         | Name | Jayson |
#     Then Mandatory field error is not displayed

# Scenario: Verify that payees can be sorted by name
#     Given I am on the Payees page
#     When I add new payee details:
#         | Name    | Jayson  |
#         | Bank    | 00      |
#         | Branch  | 1234    |
#         | Account | 0097251 |
#         | Suffix  | 000     |
#     Then list is sorted in ascending order by default
#     When I sort order by name
#     Then list is sorted in descending order

# Scenario: Navigate to Payments page
#     Given I navigate to Payments via navigation menu
#     When I transfer $500 from Everyday account to Bills account
#     Then Transfer successful message is displayed
#     And The current balance of Everyday account and Bills account are correct
#         | Everyday | 2,000.00 |
#         | Bills    | 920.00   |
