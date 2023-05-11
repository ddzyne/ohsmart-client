import { useEffect, SyntheticEvent, Suspense } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SectionType } from '../../types/Metadata';
import { SingleField, GroupedField } from './MetadataFields';
import { StatusIcon } from '../generic/Icons';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getMetadata, getOpenPanel, setOpenPanel, setSectionStatus } from './metadataSlice';
import { lookupLanguageString } from '../../app/helpers';
import Skeleton from '@mui/material/Skeleton';

const Form = () => {
  const dispatch = useAppDispatch();
  const metadata = useAppSelector(getMetadata);
  const openPanel = useAppSelector(getOpenPanel);

  // initialize section statusses on initial render
  useEffect(() => {
    dispatch(setSectionStatus(null));
  }, []);

  // handles accordion open/close actions, sends to redux store
  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      dispatch(setOpenPanel(isExpanded ? panel : ''));
    };

  // We add in an additional Suspense component.
  // Otherwise loads accordion before loading i18n namespace and crashes.

  return (
    <>
      {(metadata as SectionType[]).map((section, sectionIndex) => 
        <Accordion 
          key={`section-${section.id}`} 
          expanded={openPanel === section.id} 
          onChange={handleChange(section.id)} 
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${section.id}-content`}
            id={`${section.id}-header`}
          >
            <Suspense fallback={<Skeleton variant="circular" />}><StatusIcon status={section.status} margin="r" /></Suspense>
            <Typography>{lookupLanguageString(section.title)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Suspense fallback="">
                {section.fields.map((field, i) => 
                  field.type === 'group' ?
                  <GroupedField key={i} field={field} sectionIndex={sectionIndex} /> :
                  <SingleField key={i} field={field} sectionIndex={sectionIndex} />
                )}
              </Suspense>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  )
}

export default Form;