import React, { useState } from 'react';
import { find } from 'lodash';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';

import DeleteForm from './DeleteForm';
import EditForm from './EditForm';
import FormSelector from './FormSelector';
import HorizontalResizePanels from '../common/HorizontalResizePanels';
import IngestForm from './IngestForm';
import PageContainer from '../common/PageContainer';


function CorpusManager(props) {
  const { routes } = props;
  
  const [isOpen, setIsOpen] = useState(true);
  const [ activePage, setActivePage ] = useState('ingest');

  const shouldShowLanguages = activePage !== 'ingest';

  const forms = [
    {
      component: (<IngestForm />),
      icon: (<PublishIcon />),
      label: 'ingest',
      title: 'Add a Text',
    },
    {
      component: (<EditForm />),
      icon: (<EditIcon />),
      label: 'edit',
      title: 'Edit Text Metadata',
    },
    {
      component: (<DeleteForm />),
      icon: (<DeleteIcon />),
      label: 'delete',
      title: 'Remove Texts',
    },
  ];

  const currentForm = find(forms, item => item.label == activePage).component;

  return (
    <main>
      <PageContainer
        routes={routes}
        showLanguages={shouldShowLanguages}
        toggleSideBar={(event) => setIsOpen(prevOpen => !prevOpen)}
      >
        <HorizontalResizePanels
          leftChild={
            <FormSelector
              forms={forms}
              onSelect={setActivePage}
              selected={activePage}
            />
          }
          leftMinWidth={35}
          open={isOpen}
          rightChild={currentForm}
          rightMinWidth={35}
        />
      </PageContainer>
    </main>
  );
}


export default CorpusManager;