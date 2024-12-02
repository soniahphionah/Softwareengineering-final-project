app = Flask(_name_)
app.secret_key = 'your_secret_key'

# Sample user credentials (username: password)
USERS = {
    'user1': 'password1',
    'user2': 'password2'
}

PRODUCTS = [
    {"name": "Metal Work", "price": "KSh 2000"},
    {"name": "Wooden Furniture", "price": "KSh 5000"},
    {"name": "Household Tools", "price": "KSh 1500"},
]

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if username in USERS and USERS[username] == password:
        return redirect(url_for('shop'))
    else:
        flash('Invalid username or password. Please try again.')
        return redirect(url_for('home'))

@app.route('/shop')
def shop():
    return render_template('shop.html', products=PRODUCTS)

@app.route('/order', methods=['POST'])
def order():
    product_name = request.form['product']
    flash(f'Thank you for ordering {product_name}!')
    return redirect(url_for('shop'))

if _name_ == '_main_':
    app.run(debug=True)