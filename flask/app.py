

from flask import Flask, jsonify, request
from flaskext.mysql import MySQL



app = Flask(__name__)

# MySQL configurations
mysql = MySQL()
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'praca_mg'
mysql.init_app(app)

@app.route('/api/get_citys')
def home():
    try:
        connection = mysql.connect()
        cursor = connection.cursor()
        cursor.execute("SELECT DISTINCT City_read FROM read_place") # Distinct - usuwanie powtórzeń
        data = cursor.fetchall()
        List = []
        for row in data:
            if row[0] not in List:
                List.append({   # dodawanie do listy
                    "City": row[0]
                })
        return jsonify(List), 200   # zamiana czegokolwiek na json
    except Exception as e:
        return(str(e))
    finally:
        cursor.close()
        connection.close()

# /api/get_places/
@app.route('/api/get_places/<city>')
def home_city(city="Warsaw"):
    try:
        connection = mysql.connect()
        cursor = connection.cursor()
        cursor.execute("SELECT Place_read FROM read_place WHERE City_read = '%s'" % city)
        data = cursor.fetchall()
        Table = []
        for row in data:
            if row not in Table:
                Table.append({
                    "Place": row
                })
        return jsonify(Table), 200
    except Exception as e:
        return(str(e))
    finally:
        cursor.close()
        connection.close()

@app.route('/api/get_PriceNormal/<city>/<places>')
def home_TicketNormal(city=False, places=False):
    try:
        connection = mysql.connect()
        cursor = connection.cursor()
        print("SELECT normal FROM read_place WHERE Place_read = '" + places + "' AND City_read = '" + city + "'")
        cursor.execute("SELECT normal FROM read_place WHERE Place_read = '" + places + "' AND City_read = '" + city + "'")
        data = cursor.fetchall()
        return {"price": float(data[0][0])}, 200
    except Exception as e:
        return(str(e))
    finally:
        cursor.close()
        connection.close()

@app.route('/api/get_PriceReduced/<city>/<places>')
def home_TicketReduced(city=False, places=False):
    try:

        connection = mysql.connect()
        cursor = connection.cursor()
        cursor.execute("SELECT reduced FROM read_place WHERE Place_read = '" + places + "' AND City_read = '" + city + "'")
        data = cursor.fetchall() # nie zwraca w tabeli , pobiera jedna wartość a nie wszystkie FETCHONE
        return {"price": float(data[0][0])}, 200
    except Exception as e:
        return(str(e))
    finally:
        cursor.close()
        connection.close()


@app.route('/api/getTicketData', methods=['POST'])
def get_TicketData():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400

    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email = request.json['email']
    phone = request.json['phone']
    city = request.json['city']
    location = request.json['location']
    date = request.json['date']
    ticket_normal = request.json['ticker_normal']
    ticket_reduced = request.json['ticker_reduced']
    price = request.json['price']
    print(firstname, lastname, email, phone, price, city, location, date, ticket_normal, ticket_reduced)

    connection = mysql.connect()
    cursor = connection.cursor()

    cursor.execute('INSERT INTO ticket_booking(First_Name, Last_Name, Email, Phone, City, Location, Date, Ticket_Normal, Ticket_Reduced, Price) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)' , (firstname, lastname, email, phone, city, location, date, ticket_normal, ticket_reduced, price))

    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"message": "OK"}), 200

@app.route('/api/getContactsData', methods=['POST'])
def get_ContactsData():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400

    firstName_contacts = request.json['firstnameContacts'] 
    lastName_contacts = request.json['lastnameContacts']
    email_contacts = request.json['emailContacts']
    phone_contacts = request.json['phoneContacts']
    text_contacts = request.json['textContacts']
    print(firstName_contacts, lastName_contacts, phone_contacts, email_contacts, text_contacts)
    
    connection = mysql.connect()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO contacts(First_Name, Last_Name, Email, Phone, Text_Message) VALUES (%s,%s,%s,%s,%s)' , (firstName_contacts, lastName_contacts, email_contacts, phone_contacts, text_contacts))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"message": "GOOD"}), 200
if __name__ == '__main__':
    app.run(debug=True)