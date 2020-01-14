import React, { Component } from 'react'

export default class SearchForm extends Component {
    render() {
        return (
            <div>
                <div id="cover">
          <form method="get" action="">
             <div className="tb">
                <div class="td"><input type="text" placeholder="Search" required></input></div>
                   <div class="td" id="s-cover">
                     <button type="submit">
                    <div id="s-circle"></div>
                        <span></span>
                            </button>
                        </div>
                     </div>
                    </form>
                    </div>
                
            </div>
        )
    }
}
