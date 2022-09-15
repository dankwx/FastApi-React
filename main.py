from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create a api for "Items", each item has id, name and price

items = [
    {
        "id": 1,
        "name": "Item 1",
        "price": 10.00
    },
    {
        "id": 2,
        "name": "Item 2",
        "price": 20.00
    },
    {
        "id": 3,
        "name": "Item 3",
        "price": 30.00
    }
]


@app.get("/items")
async def get_items():
    return items


@app.get("/items/{item_id}")
async def get_item(item_id: int):
    for item in items:
        if item["id"] == item_id:
            return item
    return {"error": "Item not found"}


@app.post("/items")
async def create_item(item: dict):
    items.append(item)
    return item


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: dict):
    for i in range(len(items)):
        if items[i]["id"] == item_id:
            items[i] = item
            return item
    return {"error": "Item not found"}


@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    for i in range(len(items)):
        if items[i]["id"] == item_id:
            items.pop(i)
            return {"success": "Item deleted"}
    return {"error": "Item not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
