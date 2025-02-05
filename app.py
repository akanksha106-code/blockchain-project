from flask import Flask, request, jsonify, render_template
from blockchain import Blockchain

app = Flask(__name__)
blockchain = Blockchain()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_block', methods=['POST'])
def add_block():
    data = request.json.get('data')
    blockchain.add_block(data)
    return jsonify({'message': 'Block added successfully'}), 200

@app.route('/get_chain', methods=['GET'])
def get_chain():
    chain = blockchain.get_chain()
    response = []
    for block in chain:
        response.append({
            'index': block.index,
            'previous_hash': block.previous_hash,
            'timestamp': str(block.timestamp),
            'data': block.data,
            'hash': block.hash
        })
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
