import React from "react"

import data from "./items.json"
import ListItem from "./ListItem"
import EditListItem from "./EditListItem"
import Header from "./Header"
import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import CardColumns from 'react-bootstrap/CardColumns'

class Collection extends React.Component{
    constructor(){
        super()
        this.state = {
            items : [],
            filter : "",
            sort : "Default",
            lastId : 0
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNavbarChange = this.handleNavbarChange.bind(this)
        this.addItemClick = this.addItemClick.bind(this)
    }

    componentDidMount(){
        this.setState({
            items : data.map(item => {
                item.Edited = false
                return item
            }),
            lastId : data.sort((a, b) => (a.Id > b.Id) ? 1 : -1).slice(-1).pop().Id
        })
        
    }

    handleDeleteClick(id){
        this.setState(prevState => {
            const newItems = prevState.items.filter(item =>{
                if(item.Id === id){
                    return false
                }
                return true
            })
            return {
                items : newItems
            }
        })
    }

    handleEditClick(id){
        this.setState(prevState => {
            const newItems = prevState.items.map(item =>{
                if(item.Id === id){
                    item.Edited = true
                }
                return item
            })
            return {
                items : newItems
            }
        })
        window.scrollTo(0, 0)
    }

    handleChange(event, id){
        const {value, name} = event.target
        this.setState(prevState =>{
            const newItems = prevState.items.map(item =>{
                if(item.Id === id){
                    item[name] = value
                }
                return item
            })
            return {
                items : newItems
            }
        })
    }

    handleNavbarChange(event){
        const {value, name} = event.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit(id){
        this.setState(prevState => {
            const newItems = prevState.items.map(item =>{
                if(item.Id === id){
                    item.Edited = false
                }
                return item
            })
            return {
                items : newItems
            }
        })
    }

    addItemClick(){
        this.setState(prevState => {
            const newItems = prevState.items.slice()
            newItems.push({
                Id : prevState.lastId+1,
                Name : "",
                ImageUrl : "",
                Description : "",
                Rating : "",
                Edited : true
            })
            return {
                items: newItems,
                lastId : prevState.lastId + 1
            }
        })
    }

    sortItems(items){
        switch(this.state.sort) {
            case "NameAsc":
                return items.sort((a, b) => (a.Name > b.Name) ? 1 : -1)
            case "NameDesc":
                return items.sort((a, b) => (a.Name < b.Name) ? 1 : -1)
            case "RatingAsc":
                return items.sort((a, b) => (a.Rating > b.Rating) ? 1 : -1)
            case "RatingDesc":
                return items.sort((a, b) => (a.Rating < b.Rating) ? 1 : -1)
            default:
                return items.sort((a, b) => (a.Id > b.Id) ? 1 : -1)
          } 
    }

    render(){
        const filteredItems = this.state.items.filter(item =>{
            if(item.Name.includes(this.state.filter)){
                return true
            }
            return false
        })
        const sortedItems = this.sortItems(filteredItems)

        const itemList = sortedItems.filter(item => { return !item.Edited} )
            .map(item => {
                return <ListItem 
                    key={item.Id} 
                    item={item}
                    handleDeleteClick={this.handleDeleteClick}
                    handleEditClick={this.handleEditClick}
                />
            })
        const newAndEditedItems = this.state.items.filter(item => { return item.Edited})
        .sort((a, b) => (a.Id < b.Id) ? 1 : -1)
        .map(item => {
            return <EditListItem 
                key={item.Id} 
                item={item}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleDeleteClick={this.handleDeleteClick}
            />
        })
        
        return(
            <div >
                <Header 
                    filter={this.state.filter} 
                    sort={this.state.sort} 
                    handleNavbarChange={this.handleNavbarChange}
                    addItemClick={this.addItemClick}
                    className="row"
                />
                <Col>
                    {newAndEditedItems}
                </Col>
                <Col>
                {itemList}
                </Col>
            </div>
        )
    }
}

export default Collection