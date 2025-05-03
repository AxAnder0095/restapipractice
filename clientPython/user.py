import requests
import json 

#ToDo: auto format prices so end user does not have to, also start adding in mongoDB backend

def main():
    print('\n\nWelcome to Penguins Luxury Autos. Please browse our available collection')
    prompt = '''------------------------------------------------------------------------
Access, Add, update or delete cars from our inventory (press 0 to exit)
Press 1 to get inventory
Press 2 to add a car
Press 3 to delete a car
Press 4 to update car info
Press 5 to get single car info
Choice: '''
            
    choice = input(prompt)
    while choice != '0':
        if choice == '1':
            getCars()
        elif choice == '2':
            addCar()
        elif choice == '3':
            id = input('Enter car ID: ')
            deleteCar(id)
        elif choice == '4':
            id = input('Enter car ID: ')
            updateCarInfo(id)
        elif choice == '5':
            id = input('Enter car ID: ')
            getCar(id)
            
        choice = input(prompt)

# Create
def addCar():
    make = input('Enter make: ')
    model = input('Enter model: ')
    price = input('Enter Price: $')
    img = input('Enter image: ')

    car = {
        "make": make,
        "model": model,
        "price": price,
        "img": img
    }

    res = requests.post('http://localhost:5000/api/cars', json=car)
    if not res.json()['success']:
        return print(json.dumps(res.json(), indent=4))

    print(f'\nCAR ADDED TO INVENTORY')
    print(json.dumps(res.json(), indent=4))

#Read
def getCars():
    res = requests.get('http://localhost:5000/api/cars')

    if not res.json()['success']:
        return print(json.dumps(res.json(), indent=4))

    data = res.json()['data'] # get data only
    print('-----------------------------------------------------------------------------------------------')
    print('|      MAKE      |      MODEL      |      PRICE      |                   ID                   |')
    print('-----------------------------------------------------------------------------------------------')
    for car in data:
        print(f' {car['make']:<16} {car['model']:<18} ${car['price']:<17} {car['_id']}')

def getCar(car):
    res = requests.get(f'http://localhost:5000/api/cars/{car}')

    if not res.json()['success']:
        return print('Invalid ID passed')
    
    print(json.dumps(res.json(), indent=4))

def updateCarInfo(car):
    url = f'http://localhost:5000/api/cars/{car}'
    res = requests.get(url)

    if not res.json()['success']:
        return print('Invalid ID or Vehicle does not exist')

    updateCar = {
        "make": res.json()['data']['make'],
        "model": res.json()['data']['model'],
        "price": res.json()['data']['price'],
        "img": res.json()['data']['img'],
        "id": res.json()['data']['_id']
    }

    choice = input('\npress 1 to updata make\npress 2 to update model\npress 3 to update price\npress 4 to update image, press 5 to update all\nChoice: ')

    if choice == '1':
        updateCar['make'] = input('Make: ') 
    elif choice == '2':
        updateCar['model'] = input('Model: ')
    elif choice == '3':
        updateCar['price'] = input('Price: ')
    elif choice == '4':
        updateCar['img'] = input('Image: ')
    elif choice == '5':
        updateCar['make'] = input('Make: ')
        updateCar['model'] = input('Model: ')
        updateCar['price'] = input('Price: ')
        updateCar['img'] = input('Image: ')
    
    
    res = requests.put(url, json=updateCar)
    print('CAR UPDATED')
    print(json.dumps(res.json(), indent=4))

#Delete
def deleteCar(car):
    res = requests.delete(f'http://localhost:5000/api/cars/{car}')
    print('\nCAR DELETED FROM INVENTORY')
    print(json.dumps(res.json(), indent=4))
        
main()

