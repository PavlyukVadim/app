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
          <div class="repo-name">
            <h3>
              <a
                itemprop="name codeRepository"
                href={openedRepo.html_url}   
              >
                {openedRepo.name}
              </a>
            </h3>
            <span onClick={() => this.closeDialog()}>&#10006;</span>
          </div>
          <div class="contributors-table">
            <h4>Contributors:</h4>
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
          <div class="row languages-row">
            <div class="col languages-pie-chart">
              {
                openedRepo.languages &&
                <PieChart
                  data={openedRepo.languages}
                />
              }    
            </div>
            <div class="col">
              <ul>
                {
                  openedRepo.languages &&
                  Object.keys(openedRepo.languages).map((language) => {
                    return (
                      <li key={language}>
                        <span class="repo-language-color" style={{backgroundColor: programmingLanguages[language]}}/>
                        {language} {openedRepo.languages[language]} Kb
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div class="PRs-table">
            {
              openedRepo.PRs && openedRepo.PRs.length !== 0 &&
              <h4>PRs:</h4>
            }
            {
              openedRepo.PRs &&
              openedRepo.PRs.map((PR) => {
                return (
                  <li key={PR.title}>
                    <a href={PR.html_url}>{PR.title}</a>
                  </li>
                )
              })
            }
          </div>
          {
            openedRepo.source &&
            <p>Forked From:&nbsp;
              <a href={openedRepo.source.html_url}>
                {openedRepo.source.full_name}
              </a>
            </p>
          }
        </div>
      </div>
    );
  }
}

export default Dialog;
