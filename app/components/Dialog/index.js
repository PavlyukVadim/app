import {h, Component} from 'preact';
import PieChart from './../PieChart';
import programmingLanguages from './../Card/programmingLanguages';

class Dialog extends Component {
  
  constructor(props) {
    super(props);
    this.closeDialog = this.closeDialog.bind(this);
  }

  closeDialog() {
    this.props.closeDialog();
  }

  render({ openedRepo = {}, dialogMode ='close' }) {
    console.log(openedRepo)
    return (
      <div
        class={`dialog ${dialogMode}`}
      >
        <div
          class={`sub-modal ${dialogMode}`}
          onClick={() => this.closeDialog()}
        />
        <div class="panel">
          <a href={openedRepo.html_url}>{openedRepo.name}</a>
          <div class="contributors-table">
            <h3>contributors</h3>
            <table class="table" cellpadding="0" cellspacing="0">
              <colgroup>
                <col span="1" />
                <col span="1" class="table-cell-divider"/>
              </colgroup>
              <tr class="table-row">
                <th class="table-cell">login</th>
                <td rowspan="5"></td>
                <th class="table-cell">contributions</th>
              </tr>
              {
                openedRepo.contributors &&
                openedRepo.contributors.map((contributor) => {
                  return (
                    <tbody>
                      <tr class="table-row-divider"><td colspan="3"></td></tr>
                      <tr class="table-row">
                        <td class="table-cell">
                          <a href={contributor.html_url}>{contributor.login}</a>
                        </td>
                        <td rowspan="5"></td>
                        <td class="table-cell">{contributor.contributions}</td>
                      </tr>
                    </tbody>
                  );
                })
              }
            </table>
          </div>
          {
            openedRepo.languages &&
            <PieChart
              data={openedRepo.languages}
            />
          }
          { 
            openedRepo.languages &&
            
              Object.keys(openedRepo.languages).map((language) => {
                return (
                  <li>
                    <span class="repo-language-color" style={{backgroundColor: programmingLanguages[language]}}/>
                    {language}  
                  </li>
                )
              })
          }
          {
            openedRepo.source &&
            <a href={openedRepo.source.html_url}>Forked From</a>  
          }
        </div>
      </div>
    );
  }
}

export default Dialog;
