import datetime
import math
import pyfiglet
from colorama import Fore, Back


def get_vacation_year():
    """
    The user selects which vacation year they want to calculate.
    """
    while True:
        global vacation_year
        vacation_year = input(Fore.RESET + "\nEnter the vacation year \
you want to calculate (YYYY): ")

        if validate_vacation_year(vacation_year):
            break

    global last_vac_year
    last_vac_year = int(vacation_year) - 1


def validate_vacation_year(vacation_year):
    """
    Validates vacation year date format.
    @param vacation_year: this is a string that represents the date
    in YYYY-MM-DD format
    """
    try:
        vacation_year = datetime.datetime.strptime(vacation_year, "%Y")
    except ValueError:
        print(Fore.RED + "\nIncorrect vacation year format, please try again!")
        return False

    return True


def get_employment_date():
    """
    Get employment date from the user.
    """
    while True:
        global employment_date
        employment_date = input(Fore.RESET + "\nEnter your employment date \
(YYYY-MM-DD): ")

        if validate_employment_date(employment_date):
            break


def validate_employment_date(employment_date):
    """
    Validate employment date format.
    """
    try:
        employment_date = datetime.datetime.strptime(
            employment_date, "%Y-%m-%d")
    except ValueError:
        print(Fore.RED + "\nIncorrect employment date format, \
please try again!")
        return False

    return True


def get_holiday_entitlement():
    """
    Get holiday entitlement from the user.
    """
    while True:
        global holiday_entitlement
        holiday_entitlement = input(Fore.RESET + "\nEnter the number \
of your holiday_entitlement (e.g. 25): ")

        if validate_holiday_entitlement(holiday_entitlement):
            break


def validate_holiday_entitlement(holiday_entitlement):
    """
    Validates the holiday entitlement format and controls the minimum
    number of days (25).
    """
    try:
        holiday_entitlement = int(holiday_entitlement)
        if holiday_entitlement < 25:
            print(Fore.RED + "\nHoliday entitlement must be at least \
25 days. Please try again!")
            return False
    except ValueError:
        print(Fore.RED + "\nIncorrect holiday entitlement format, \
please try again!")
        return False

    return True


def explain_absence_data():
    """
    Explains what kind of data the user should enter in the next step.
    """
    answer = input("\nBefore moving on, we recommend you to read about \
absence data. Do you want to read more about absence data? (y/n): ")
    if answer.lower() == "y":
        print(Back.GREEN + "\nCertain types of absence qualify for \
vacation pay. These days should not be included in the total days \
of absence you will enter in the next step. Here are the details:\
\n\n - Sick Leave: You can take up to 180 days of sick leave during \
the accrual year without affecting your paid vacation. This applies \
throughout the year of onset and the subsequent qualifying year.\
\n\n - Workplace Injury: If you experience a workplace injury, you’re \
eligible for absence during the year of onset and the following \
qualifying year.\n\n - Parental Leave: You can stay at home for a \
total of 120 days per child (or per pregnancy, regardless of whether \
it’s twins). \n\n - Care of a Sick Child: You’re entitled to 120 days \
of absence each qualifying year for caring for a sick child.\
\n\n - Pregnancy allowance: During the authorized period, taking \
time off due to pregnancy doesn’t impact your paid vacation.\
\n\n - Disease Vector:  If you’re carrying an infectious disease, you \
can be absent for up to 180 days during the qualifying year.\
\n\n - Dependent Care Support: You can take up to 45 days of absence \
during the qualifying year without affecting your vacation pay.\
\n\n - Certain Types of Education: Trade union training, \
sign language training for parents, and Swedish language teaching \
for immigrants do not impact your vacation pay during the first \
180 days.\n")
    else:
        print(Fore.RESET + "\nOk, then you can move on without further \
explanation.")


def get_absence_data():
    """
    Get leave of absence data from the user.
    """
    while True:
        global absence_data
        absence_data = input(Back.RESET + f"\nEnter the number of \
calender days with full leave of absence that doesn't include \
days qualified for vacation pay between {last_vac_year}-04-01 \
and {vacation_year}-03-31: ")

        if validate_absence_data(absence_data):
            break


def validate_absence_data(absence_data):
    """
    Validate absence data format.
    """
    try:
        absence_data = int(absence_data)
    except ValueError:
        print("\nIncorrect absence data format, please try again!")
        return False

    return True


def calculate_employment_days(employment_date):
    """
    Calculate how many employment days the user got by comparing
    employment date and last day of vacation of the vacation year.
    """
    employment_date = datetime.datetime.strptime(employment_date, "%Y-%m-%d")

    vac_year = str(vacation_year)

    global last_day_vac_year
    last_day_vac_year = datetime.datetime.strptime(
        f"{vac_year}-04-01", "%Y-%m-%d")

    global last_day_last_vac_year
    last_day_last_vac_year = datetime.datetime.strptime(
        f"{last_vac_year}-04-01", "%Y-%m-%d")

    if employment_date <= datetime.datetime(int(last_vac_year), 4, 1):
        global emp_days
        emp_days = last_day_vac_year - last_day_last_vac_year
    else:
        emp_days = last_day_vac_year - employment_date


def calculate_paid_vacation_days(emp_days):
    """
    The calculation determines how many paid vacation days the user
    will receive by subtracting leave of absence days from total
    employment days.
    In the next step, the remaining days are related to the days in
    the current vacation year and multiplied by the vacation
    entitlement before being rounded up.
    """
    employ_days = int(emp_days.days)

    days_of_vac_year = last_day_vac_year - last_day_last_vac_year

    days_of_vac_year_int = int(days_of_vac_year.days)

    paid_vacation_days = (
        employ_days - int(absence_data))/days_of_vac_year_int *\
        int(holiday_entitlement)

    rounded_up_paid_vac_days = math.ceil(paid_vacation_days)
    print(Back.MAGENTA + f"\nYou will get {rounded_up_paid_vac_days} \
paid vacation days {vacation_year}!")

    if rounded_up_paid_vac_days < int(holiday_entitlement):
        unpaid_vacation_days = int(
            holiday_entitlement) - rounded_up_paid_vac_days
        print(f"\nYou will also receive {unpaid_vacation_days} unpaid \
vacation days as you are entitled to {holiday_entitlement} vacation days \
each year.")


def main():
    """
    Run all program functions
    """
    get_vacation_year()
    get_employment_date()
    get_holiday_entitlement()
    explain_absence_data()
    get_absence_data()
    calculate_employment_days(employment_date)
    calculate_paid_vacation_days(emp_days)


if __name__ == '__main__':
    result = pyfiglet.figlet_format("Vacation Calculator")
    print(result)
    print("This calculator works out how many paid vacation days you \
    can expect in a vacation year.\n")
    print("The calculator is adapted to the Swedish vacation law \
    and assumes that the previous year is the qualifying year.")
    main()
